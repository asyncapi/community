terraform {
  required_providers {
    slack = {
      source  = "pablovarela/slack"
      version = "~> 1.0"
    }
  }
}

variable "data_sources" {
  default = {
    tsc_members_user_ids = []
    maintainers_user_ids = []
    ambassadors_user_ids = []
    repo_maintainers = {}
  }
  description = "Data sources for the slack groups from the users module"
}

locals {
  group_data = yamldecode(file("${path.module}/groups.yaml"))
  groups = {
    for group in local.group_data : group.name => {
      name = group.name
      handle = group.handle
      description = group.description
      users = lookup(group, "users", lookup(var.data_sources, lookup(group, "data_source", group.name), []))
    }
  }
}

resource "slack_usergroup" "groups" {
  for_each = local.groups
  name = each.value.name
  handle = each.value.handle
  description = each.value.description
  users = each.value.users  
}

resource "slack_usergroup" "maintainer_repos" {
  for_each = var.data_sources.repo_maintainers
  name = "maintainer_${each.key}"
  handle = "maintainer_${each.key}"
  description = "Maintainers for ${each.key}"
  users = each.value
}
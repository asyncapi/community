terraform {
  required_providers {
    slack = {
      source  = "pablovarela/slack"
      version = "~> 1.0"
    }
  }
}

variable "wg_channels" {
  description = "Map of working group channels"
}

variable "data_sources" {
  default = {
    tsc_members_user_ids = []
    maintainers_user_ids = []
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
      channels = lookup(group, "channels", [])
    }
  }
}

resource "slack_usergroup" "groups" {
  for_each = local.groups
  name = each.value.name
  handle = each.value.handle
  description = each.value.description
  users = each.value.users  
  channels = each.value.channels
}

resource "slack_usergroup" "maintainer_repos" {
  for_each = var.data_sources.repo_maintainers
  name = "Maintainers of asyncapi/${each.key}"
  handle = "maintainers_${each.key}"
  description = "Maintainers for https://github.com/asyncapi/${each.key}"
  users = each.value
}

locals {
  working_groups_data = yamldecode(file("${path.module}/../../../../WORKING_GROUPS.yaml")).working_groups
  wg_groups = {
    for wg_data in local.working_groups_data : wg_data.name => {
      name = lookup(lookup(lookup(wg_data, "slack", {}), "group", {}), "name", wg_data.name)
      description = lookup(lookup(lookup(wg_data, "slack", {}), "group", {}), "description", lookup(wg_data, "description", ""))

      # Handle will be the name of the group in lowercase and with spaces replaced by hyphens succeded by "wg-"
      handle = lookup(lookup(lookup(wg_data, "slack", {}), "group", {}), "handle", "${replace(lower(wg_data.name), " ", "-")}-wg")
      users = concat([for member in wg_data.chairpersons : member.slack], [for member in wg_data.members : member.slack])
    }
  }
}

resource "slack_usergroup" "wg_groups" {
  for_each = local.wg_groups
  name = each.value.name
  handle = each.value.handle
  description = each.value.description
  users = each.value.users  
  channels = [var.wg_channels[each.value.name].id]
}
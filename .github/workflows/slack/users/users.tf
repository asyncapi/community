terraform {
  required_providers {
    slack = {
      source  = "pablovarela/slack"
      version = "~> 1.0"
    }
  }
}

locals {
  maintainers_data = yamldecode(file("${path.root}/../../../MAINTAINERS.yaml"))

  # maintainers with isTscMember = true are added to the tsc_members group
  tsc_members_data = [for maintainer in local.maintainers_data : maintainer if lookup(maintainer, "isTscMember", false) == true]

  # Make a map of repo maintainers with their slack user id with repo name as key
  repos = setunion(flatten([for maintainer in local.maintainers_data : maintainer.repos]))
  repo_maintainers = {
    for repo in local.repos : repo => 
      [for maintainer in local.maintainers_data : lookup(maintainer, "slack", null) if contains(maintainer.repos, repo)]
  }
}

output "data_sources" {
  value = {
    maintainers_user_ids = [for maintainer in local.maintainers_data : lookup(maintainer, "slack", null)]
    tsc_members_user_ids = [for tsc_member in local.tsc_members_data : lookup(maintainer, "slack", null)]
    repo_maintainers = local.repo_maintainers
  }
}
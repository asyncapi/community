terraform {
  required_providers {
    slack = {
      source  = "pablovarela/slack"
      version = "~> 1.0"
    }
  }
}

locals {
  ambassadors_data = jsondecode(file("${path.root}/../../../AMBASSADORS.json")) 
  ambassadors_emails = {
    for ambassador in local.ambassadors_data : ambassador.email => {
      email = ambassador.email
    }
  }

  maintainers_data = yamldecode(file("${path.root}/../../../MAINTAINERS.yaml"))

  # maintainers with isTscMember = true are added to the tsc_members group
  tsc_members_data = [for maintainer in local.maintainers_data : maintainer if lookup(maintainer, "isTscMember", false) == true]

  # Make a map of repo maintainers with their slack user id with repo name as key
  repos = setunion(flatten([for maintainer in local.maintainers_data : maintainer.repos]))
  repo_maintainers = {
    for repo in local.repos : repo => 
      [for maintainer in local.maintainers_data : maintainer.slack if contains(maintainer.repos, repo)]
  }
}

data "slack_user" "ambassadors" {
  for_each = local.ambassadors_emails
  email = each.value.email
}

output "data_sources" {
  value = {
    ambassadors_user_ids = [for ambassador in local.ambassadors_data : data.slack_user.ambassadors[ambassador.email].id]
    maintainers_user_ids = [for maintainer in local.maintainers_data : maintainer.slack]
    tsc_members_user_ids = [for tsc_member in local.tsc_members_data : tsc_member.slack]
    repo_maintainers = local.repo_maintainers
  }
}
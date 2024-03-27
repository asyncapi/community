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
  description = "Data sources for the slack channels from the users module"
}

locals {
  channel_data = yamldecode(file("${path.module}/channels.yaml"))
  channels = {
    for channel in local.channel_data : channel.name => {
      name = channel.name
      topic = channel.topic
      purpose = channel.purpose

      # if permanent_members is not provided, then it wil be taken from local with the name in data sources
      permanent_members = lookup(channel, "permanent_members", lookup(var.data_sources, lookup(channel, "data_source", channel.name), []))
      is_private = channel.is_private
      action_on_destroy = channel.action_on_destroy

      # if private channel, then kick all users on update else none
      action_on_update_permanent_members = channel.is_private ? "kick" : "none"
      adopt_existing_channel = true
    }
  }
}

resource "slack_conversation" "channels" {
  for_each = local.channels
  name = each.value.name
  topic = each.value.topic
  purpose = each.value.purpose
  permanent_members = each.value.permanent_members

  is_private = each.value.is_private
  action_on_destroy = each.value.action_on_destroy
  action_on_update_permanent_members = each.value.action_on_update_permanent_members
  adopt_existing_channel = each.value.adopt_existing_channel  
}
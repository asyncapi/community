---
title: Holopin Badges for Maintainers
weight: 80
---

# Holopin Badges for Maintainers

Holopin is a platform that allows open source maintainers to issue digital badges to contributors, recognizing their efforts in a fun and verifiable way.  
This guide explains how AsyncAPI maintainers can set up Holopin for their repositories, prerequisites to follow, and how to use the Holopin bot.

## Prerequisites
- Admin or maintainer access to the GitHub repository.  
- A Holopin account: [https://holopin.io](https://holopin.io)  
- The Holopin GitHub App installed: [Holopin GitHub Integration](https://docs.holopin.io/integrations/github)  

## Setup Holopin for your repo
1. Create a file named `.github/holopin.yml` in your repository.  
2. Copy the configuration from [AsyncAPI’s holopin.yml example](https://github.com/asyncapi/.github/blob/master/.github/holopin.yml).  
3. Update the badge definitions and rules as needed.  

## Using the Holopin bot
- The Holopin bot automatically issues badges based on rules in `holopin.yml`.  
- You can also issue badges manually through the Holopin dashboard.  
- More details: [Holopin GitHub Integration Guide](https://docs.holopin.io/integrations/github)  

## Need help?
- Check the [Holopin docs](https://docs.holopin.io)  
- Contact [support@holopin.io](mailto:support@holopin.io)  
- Or ask in the [AsyncAPI Slack](https://www.asyncapi.com/slack)  

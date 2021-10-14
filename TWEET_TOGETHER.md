# Goal

Our goal is to enable the community to tweet together from official AsyncAPI account. Why would only selected people be allowed to share their voice, right?

## Technical setup

This approach enable us to get tweets suggestions through GitHub Pull Requests. This means anybody can jump into the review, suggest improvements and have open discussion. 

## Rules

AsyncAPI Initiative do not have yet a official guidelines for social media communication. When tweeting please take into account:

- Our [Code of Conduct](https://github.com/asyncapi/.github/blob/master/CODE_OF_CONDUCT.md)
- Consult with guidelines of a [friend project](https://github.com/cncf/foundation/blob/master/social-guidelines.md) that has much more experience in the field that we have

## How to create a tweet

To create a new tweet create a new `*.tweet` file in `tweets/` folder. Once you are done, open a pull request.

> Automation on a pull request level will validate if your tweet is valid and can be published to Twitter. 

<kbd>[Create new tweet](../../../new/master/?filename=tweets/<your-tweet-name>.tweet)</kbd>

> In case it is your first time interaction with **community** repo, you will be asked to fork it. If you plan to contribute more than once then setup your fork with [this instruction](https://github.com/asyncapi/.github/blob/master/git-workflow.md).

## When is the tweet published to twitter?

Once pull request with new tweet is merged, a dedicated workflow triggers to publish tweet. In other words tweets are automatically published after merging a pull request.

It is not yet possible to create a scheduled tweet. Twitter API supports it already but the GitHub Action that we are using not.

## Example tweet

Create a new file `tweets/hello-world.tweet` with the content

> Hello, world!

You can use subfolders, e.g. `tweets/2019-02/hello-world.tweet`, as long as the file is in the `tweets/` folder and has the `.tweet` file extension

## How to create a reoccuring tweet

1. Create `*.tweet` file with tweet content in `.github/scripts/reocurring_tweets` directory
2. Create new GitHub Action workflow based on [this example](.github/workflows/twitter-ideas.yml). The example provides comments for sections that needs to be modified in your version of the workflow. The name of the workflow shoudl start with `twitter-reoccuring-` prefix.

## Notes

- Only newly created files are handled, deletions, updates or renames are ignored. In other words, for example, if you remove a certain `*.tweet` file, it doesn't mean the tweet will be removed from Twitter.
- `*.tweet` files will not be created for tweets you send out directly from twitter.com.
- If you need to rename an existing tweet file, please do so locally using [`git mv old_filename new_filename`](https://help.github.com/en/articles/renaming-a-file-using-the-command-line), otherwise it may occur as deleted and added which would trigger a new tweet.
- your message must fit into a single tweet

## Questions?

If you have any further questions or suggestions, please create an issue [here](../issues/new).
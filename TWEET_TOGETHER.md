# Goal

Our goal is to enable *anyone* from the community to ✨ tweet with us ✨ from the [official AsyncAPI twitter](https://twitter.com/AsyncAPISpec) account. After all, why should only a few selected people be allowed to share their voices? 🥳

## Technical requirements

This approach enables us to receive tweet suggestions through GitHub Pull Requests (PRs). This means anybody can jump into the review, suggest improvements, and have start discussions. 🎉 

## Guidelines 

The AsyncAPI Initiative doesn't have (yet) an official guideline for social media communication. 

That said, when tweeting please take into account the following:

- Our [Code of Conduct](https://github.com/asyncapi/.github/blob/master/CODE_OF_CONDUCT.md).
- Consult with guidelines of a [friend project](https://github.com/cncf/foundation/blob/master/social-guidelines.md) that has much more experience in the field than we have.

## Create a tweet

To create a new tweet, create a new `*.tweet` file in the `tweets/` folder. Once you're done, open a PR.

> Automation at a Pull Request level will validate if your tweet is valid and can be published to Twitter. 

<kbd>[Create new tweet](../../../new/master/?filename=tweets/<your-tweet-name>.tweet)</kbd>

> If it is your first time interacting with the **community** repo, you will be asked to fork it. If you plan to contribute more than once, then setup your fork with [these instructions](https://github.com/asyncapi/.github/blob/master/git-workflow.md).

### Sample Hello World tweet

An example _Hello World_ 🌎 tweet file in our `tweets/` folder might be named something like `tweets/hello-world.tweet`.

The content of that tweet file might look something like this:
> Hello, world! 🌎

You can also use subfolders (e.g. `tweets/2019-02/hello-world.tweet`) as long as the file is in the `tweets/` folder and has the `.tweet` file extension.

## Create a recurring tweet

1. Create `*.tweet` file with your tweet content in the `.github/scripts/recurring_tweets` directory.
2. Create new GitHub Action workflow based on [this example](.github/workflows/twitter-ideas.yml). That example provides comments for sections that need to be modified in your version of the workflow. The name of the workflow should start with a `twitter-recurring-` prefix.


## When is my tweet published to twitter?

Once your PR with your new tweet submission is merged, a dedicated workflow triggers publishing the tweet. In other words, your tweet will be automatically published after the PR is merged.

📝 **NOTE:** It isn’t possible yet to create a scheduled tweet. The Twitter API supports it already, but the GitHub Action we're using does not.

## Limitations 

- Only newly created files are handled; deletions, updates or renames are ignored. (Example: If you remove a specific `*.tweet` file, it doesn't mean that the tweet will be removed from Twitter.)
- `*.tweet` files will not be created for tweets you send out directly from twitter.com.
- If you need to rename an existing `*.tweet` file, please do so locally using [`git mv old_filename new_filename`](https://help.github.com/en/articles/renaming-a-file-using-the-command-line). Otherwise, it may show up as both deleted and added, which would trigger a new tweet.
- Your message must fit into a single tweet.

## Questions? Ideas?

If you have any more questions or suggestions, please create an issue [here](../issues/new). 🙂
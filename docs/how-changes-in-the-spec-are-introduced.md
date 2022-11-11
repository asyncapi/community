# How changes in the spec are made

AsyncAPI initiative always concentrates on the problems rather than the solution. This is because you are generally rather single-minded when you already have a solution in mind to a problem instead of fully diving into the issue, seeing alternatives, and finding the best solution.

### RFCs & Champions

Some changes, however, are "substantial," We ask that these be put through a bit of a design process and produce a consensus among the AsyncAPI contributors/maintainers. The "RFC" (request for comments) process is intended to provide a consistent and controlled path for new features to enter the project.

#### What is RFC?

An RFC is a document that proposes an idea and serves as high-level documentation of the concept and its thinking.

AsyncAPI finds this valuable because it makes prototyping an idea with words easy and flexible rather than immediately diving into an idea. RFCs force champions to explore the idea, document it and create a proposal for bringing it to life.

#### Who is a champion?

A Champion takes ownership of an idea and follows the proposed process to make the idea a reality.

## The spec changes lifecycle

The motivation for the Changes process is to raise the visibility of planned changes and make coordination and planning efforts easier. It is nearly impossible to follow all changes in a big project such as AsyncAPI spec. By providing a mechanism for sharing changes, it is easier for contributors to know what is coming and to ensure that we can address the impacts of changes well before the release date. The spec changes lifecycle consist of 2 parts, as seen below.

### The Change Process

- The author submits the change proposal by creating a discussion about the proposed changes.
    The person or group proposing the change is responsible for providing the first draft of the changes. Ideally, it's preferable to make this draft available as a pull request before submitting the Change proposal so the community can evaluate the change. However, starting with an issue is also permitted if the full details are not worked out.

- The contributors/maintainers reviews the proposed change request.
    The goal of this check is to prove or disprove a problem and guide the discussion toward either rejection or a preferred solution.

- Implementing the change
    The author doesn't have to be the one to implement the change proposed but keep in mind that it might take a while before someone else does

- Possibly iterate/refine as the community gets experience with your proposed changes
    There may be some additional feedback about design choices that might be adjusted.

- Test implementation to gain confidence
    When your change implementation is baked enough, and the solution seems desirable, there will be a compliant implementation with the AsyncAPI libraries and a test to gain confidence.

- Relax.
    Suppose the implementation of the proposed changes has convinced contributors/maintainers via implementations and tests that it appropriately handles all edge cases. Then the changes will be merged into the spec and will be included in the next released version.

Let's use an existing proposed change as an example of the change process implementation. At the time of this article, AsyncAPI released a new version of the specification, v2.5.0, and this came with a couple of exciting changes, including features and fixes. We'll look into one of these changes that were introduced.

#### feat: allow re-usability of Server Variable Objects

A contributor and champion named Vladimir Godrej proposed a feature that would make sense in the next release of the spec. Then he created a well-detailed issue that explains why this feature is required in the next release [#775](https://github.com/asyncapi/spec/issues/775).

After the issue, he created a PR for the issue, which was reviewed by the contributors/maintainers and in the PR thread. More on this can be found here [#776](https://github.com/asyncapi/spec/pull/776)

Soon after the review and potential improvement based on feedback, he tested the implementation with one of the AsyncAPI libraries to ensure it was compliant. Since the implementation was a success, his proposed change got approved and made it to the next release.

### The Release Process

This part of the lifecycle aims to describe all details of the process so that any community member can jump in and help coordinate.

The release process has four essential sections, as seen below.

- Release coordination
    This requires a single person called the `release coordinator` to ensure the release goes well throughout all phases. The release coordinator is responsible for working through the process described below.

- Release measure
    This is when a release happens at AsyncAPI. This release happens regularly in the following months:
  - January
  - April
  - June
  - September
    We do not decide whether the next release is major or minor. This decision depends on the proposals for changes in the specification and how much they affect specification and tooling in a given release cycle.

- Release Documenting
    This is a significant part of the release process as it includes raising awareness of the upcoming release and helping contributors see what is involved.

- Release publishing
    The release coordinator reaches out to potential code owners for each repository to update the release to the latest one by adding the release note they have prepared.

You can learn more about the release process [here](https://github.com/asyncapi/spec/blob/master/RELEASE_PROCESS.md#what).

# How changes in the spec are made
AsyncAPI initiative always focus on the problems and not so much on the solution. The reason for this is that generally, you are rather single-minded when you already have a solution in mind to a problem. Instead of fully diving into the problem and seeing alternatives and finding the best solution. 

## RFCs & Champions
Many changes, including bug fixes and documentation improvements, can be implemented and reviewed via the normal GitHub pull request workflow.

Some changes, however, are “substantial”, and we ask that these be put through a bit of a design process and produce a consensus among the AsyncAPI core team. The “RFC” (request for comments) process is intended to provide a consistent and controlled path for new features to enter the project.

### What is RFC? 
An RFC is a document that proposes an idea and serves as high-level documentation of the idea and the thinking behind it.

AsyncAPI finds this RFC useful because it makes prototyping an idea with words easy and flexible rather than immediately diving into an idea, and RFCs forces champions to first explore the idea, document it, and create a proposal for bringing it to life.
### Who is an RFC champion? 
A Champion is any AsyncAPI member that takes ownership of an idea and follows the proposed process to make the idea a reality.

## The spec changes lifecycle
Before the introduction of new spec changes, the changes have to go through various stages.
### RFCs proposal
Many changes to the AsyncAPI specification have been proposed, and contributing to AsyncAPI requires a lot of dedicated work. So, in order to set clear expectations and provide accountability, and advance through the AsyncAPI specification review process, each proposed RFC (request for comments) must have a _champion_ who is responsible for addressing feedback and completing the next steps.
### Implementing RFCs
Once the RFC becomes active(by active I mean once an RFC starts getting engagement by fellow contributors), the authors may implement it and submit the feature as a pull request to the spec repo or start with an issue if the full details are not worked out.

The author of an RFC is not obligated to implement it. The RFC author (like any other developer) is welcome to post implementations for review after the RFC has been accepted.

If you are interested in working on the implementation for an ‘active’ RFC, but cannot determine if someone else is already working on it, feel free to ask (e.g. by leaving a comment on the associated issue).
### Contributors/Maintainers engagement
Modifications to active RFCs can be done by contributing to the discussion/commenting on it. We strive to write each RFC in a manner that will reflect the final design of the feature; but the nature of the process means that we cannot expect every accepted RFC to actually reflect what the end result will be at the time of the next major release; therefore we try to keep each RFC document somewhat in sync with the language feature as planned, tracking such changes via followup changes to the document.

### Reviewing RFC
Maintainers and contributors will attempt to review some set of open RFC discussions frequently and a group of maintainers and contributors come together bi-weekly before the next major release of the specification with a common goal/deliverables. Note that these meetings are not specifically for major versions, it basically comes down to what is needed, and what the release coordinator/other thinks.

Every accepted feature should have a core team champion, who will represent the feature and its progress.

**AsyncAPI has an active and mutually beneficial relationship with its many implementations. The AsyncAPI specification is continuously evolving under the care of the community, which consists of AsyncAPI spec experts, contributors, and implementers. At any given time, AsyncAPI specification updates are a combination of anticipatory planning with documentation of patterns and behaviors that are already proven in production, sometimes at a very large scale.**
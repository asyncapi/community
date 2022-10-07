# How changes in the spec are introduced

The only thing you can count on is change. That’s especially true in the world of product and system development. So if you are tasked with leading the charge for your company's product development, it is vital that you stay (or become) dynamic. That's why we at AsyncAPI always try to stay dynamic by introducing new changes based on users' requirement, either by adding new features or by removing existing/deprecated ones.  

## The pain point 
Building software can be an expensive, time-consuming task. Using our resources, energy, and precious minutes to solve the right things, at the right times, in the right ways, can help ensure we’re being as efficient as possible—and we leverage the consensus-building powers of RFCs to achieve that. A common point of confusion for those who wish to contribute to AsyncAPI is where to start. In fact, you may have found yourself here after attempting to make an improvement to an AsyncAPI library. Should a new addition be made to the AsyncAPI spec first, or an AsyncAPI library first? Admittedly, this can become a bit of a [chicken-or-egg](https://en.wikipedia.org/wiki/Chicken_or_the_egg) dilemma.

## Fundamentals of how changes are introduced
We at AsyncAPI always focus on the problems and not so much on the solution. The reason for this is that generally, you are rather single-minded when you already have a solution in mind to a problem. Instead of fully diving into the problem and seeing alternatives and finding the best solution. 

Also quite important to point out that It's no small feat changing the spec, there are many aspects one must consider, and if you are used to the pace of software development in general, you will be sorely disappointed if you try to get something through in the spec

The AsyncAPI community has 2 fundamentals of how changes are introduced to the specification. Which includes RFCs&Champions and Meetings

### RFCs & Champions
Many changes, including bug fixes and documentation improvements, can be implemented and reviewed via the normal GitHub pull request workflow.

Some changes, however, are “substantial”, and we ask that these be put through a bit of a design process and produce a consensus among the AsyncAPI core team. The “RFC” (request for comments) process is intended to provide a consistent and controlled path for new features to enter the project.
Now anyone can propose changes to the AsyncAPI specification, but to do so, they start by writing a proposal called a request for comments(RFC) and present it at the weekly specification meeting. The proposal must then advance through the review stages to ultimately then be merged into the spec. 

#### What is RFC? 
An RFC is a document that proposes an idea and serves as high-level documentation of the idea and the thinking behind it:
-   **what** the idea is
-   **why** the Champions think the idea is important
-   **how** the Champions believe the idea should be executed

AsyncAPI find this RFC useful because it makes prototyping an idea with words easy and flexible rather than immediately diving into an idea, and RFCs forces champions to first explore the idea, document it, and create a proposal for bringing it to life.

At the time of this article AsyncAPI released a new version of the specification which is v2.5.0 and this came with a couple of interesting changes which includes features and fixes. We'll look into one of these changes that was introduced.

#### feat: allow re-usability of Server Variable Objects
A contributor and champion named Vladimir Gorej proposed a feature which he thinks would make sense in the next release of the spec. Then he created a well detailed issue that gives a reason why this feature is required in the next release [#775](https://github.com/asyncapi/spec/issues/775).

After the issue, he went ahead to create a PR for the issue, which got reviewed by the contributors/maintainers and also in the PR thread. More on this can be found here [#776](https://github.com/asyncapi/spec/pull/776)

Many changes to the AsyncAPI specification has been proposed, and to contribute to AsyncAPI requires a lot of dedicated work. So, in order to set clear expectation and provide accountability, and to advance through the AsyncAPI specification review process, each proposed RFC (request for comments) must have a _champion_ who is responsible for addressing feedback and completing next steps.

#### What is a champion? 
A Champion is any AsyncAPI member that takes ownership of an idea and follows the proposed process to make the idea a reality.

Champions are responsible for:

-   Creating an RFC which defines the idea
    -   What?
    -   Why?
    -   How?
-   Managing community feedback to the RFC
    -   Responding to comments
    -   Working through problems, conflicts, etc.
    -   (optional) Adapting the RFC to account for feedback
-   Leading execution
    -   Defining the work
    -   Delegating responsibilities to other members
    -   Ensuring the efforts align with RFC vision
    -   Keeping the community informed of progress


#### The RFC lifecycle
Once an RFC becomes active(by active i mean once an RFC starts getting engagement by fellow contributors), the authors may implement it and submit the feature as a pull request to the spec repo or start with an issue if the full details are not worked out.
RFCs are guided by a _champion_ through a series of stages: _strawman_, _proposal_, _draft_, and _accepted_ (or _rejected_), each of which has suggested entrance criteria.

Furthermore, the fact that a given RFC has been accepted and is ‘active’ implies nothing about what priority is assigned to its implementation, nor whether anybody is currently working on it.

Modifications to active RFCs can be done by contributing to the discussion/commenting on it. We strive to write each RFC in a manner that it will reflect the final design of the feature; but the nature of the process means that we cannot expect every accepted RFC to actually reflect what the end result will be at the time of the next major release; therefore we try to keep each RFC document somewhat in sync with the language feature as planned, tracking such changes via followup changes to the document.

#### Implementing an RFC
The author of an RFC is not obligated to implement it. The RFC author (like any other developer) is welcome to post an implementation for review after the RFC has been accepted.

If you are interested in working on the implementation for an ‘active’ RFC, but cannot determine if someone else is already working on it, feel free to ask (e.g. by leaving a comment on the associated issue).

#### Reviewing RFCs
Each week, the maintainers will attempt to review some set of open RFC discussions.

Every accepted feature should have a core team champion, who will represent the feature and its progress.

### Meetings
 A group of maintainers and contributors come together bi-weekly before the next major release of the specification with a common goal/deliverables. Note that this meetings are not specifically for major versions, it basically comes down to what is needed, and what release coordinator/other thinks

The champion plans and implements changes to the AsyncAPI specification based on the discussion in the issue/PR. The Meetings are a great way to create a platform to discuss certain aspects in-depth, which can then be written down in the issue/PR  to further progress it. 

By default, no decisions are made during the meetings, but it does provide the platform to align thoughts and ideas, way better than through comments 

Outside this weekly meetings that's been organized by maintainers and contributors, contributors can ask maintainers to schedule a dedicated public discussion, but they can prefer to do it in a 1:1 setting and not on GH issues to speed up the involvement. 

At it's core, the AsyncAPI project is organized around the specification, with a wide variety of supporting implementations and tools. 

AsyncAPI has an active and mutually beneficial relationship with its many implementations. The AsyncAPI specification is continuously evolving under the care of the community, which consists of AsyncAPI spec experts, contributors, and implementers. At any given time, AsyncAPI specification updates are a combination of anticipatory planning with documentation of patterns and behaviors that are already proven in production, sometimes at very large scale.
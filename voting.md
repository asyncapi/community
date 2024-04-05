## Voting for TSC Members

There are many situation in the open source contribution, when we need to take suggestion of all the organsiation members, whether the particular issue is required or not, or the changes is valid in the specific pull request. 

Now we can easily listen the suggestions of the members via **git-vot** bot.

### Voting Rules

* The voting will be done by only TSC Members.
* The duration of the voting will be 2 minutes. 
* The vote will be passed when more than 50% voting are in favour.

### How to vote on particular issue and pull request.

You need to add only one command to start the voting process on the issue on in the particular PR. **Please not only TSC Members can participate in the voting process**.

*A **vote label** will be added on the issue after starting of the voting process.*

**Command:**

```
/vote
```

**TSC Member starting voting process:**

![image](https://hackmd.io/_uploads/Sk_L-CWyR.png)


**Reactions to participate in voting process**
* In favor of the changes. 👍
* In against of the changes. 👎
* Abstain from the voting. 👀


**Example:**

Member voted in the favor of the required changes

![image](https://hackmd.io/_uploads/BybuXCZ1C.png)


**Result:**


![image](https://hackmd.io/_uploads/ByXBNRWJA.png)


### Checking status of the vote 
If anyone wants to check the status of the vote can easily check by using following command:

```
/check-vote
```
**Status of the vote**

![image](https://hackmd.io/_uploads/ry3dOLGJ0.png)

### Invalid vote execution 


When unauthorised member tries to execute the /vote command, he or she will get a message related to unauthorised. 

**Starting unauthorised voting:**

![image](https://hackmd.io/_uploads/BywW8AbkR.png)


**Getting response for voting**
![Screenshot 2024-04-05 at 3.09.33 PM](https://hackmd.io/_uploads/HybSDBakA.png)



### Cancelling the vote 

TSC members can cancel the voting on the particular issue or PR, The cancelling vote removes the **vote** label from an issue.

**Command:**
```
cancel-vote
```

**Cancelling vote status:**

![image](https://hackmd.io/_uploads/rkhgYUzkC.png)

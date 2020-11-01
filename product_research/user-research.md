# User Research

We performed user research to assess the intuitiveness and breadth of features regarding our product. As one of Custos' main features is to improve the user experience of analysts, we want to assure the main interface is as easy to use as possible.

We interviewed two people who would potentially be using the product, using the first iteration of our prototype (found below).

The three tasks we asked each of the users to perform are the following:
1. Identify and navigate to anomalous finding description page
2. Identify most contributing factor for why this event is an anomaly
3. Filter Events table to only display potential anomalies
 
## Prototype

[View Prototype Here](https://www.figma.com/file/UBnTzAB5WWmyctv8s8bbKq/Custos?node-id=0%3A1)

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FUBnTzAB5WWmyctv8s8bbKq%2FCustos%3Fnode-id%3D0%253A1" allowfullscreen></iframe>

## Interviews

This section consists of the rough notes and recordings of the interviews. 

### Brian Lynch (TD Data Scientist)

[View Interview Here](https://drive.google.com/file/d/19ir-XFPIcjHCvIiLDr5TN9JxTETxNPcc/view?usp=sharing)

- found anomalous findings easily
- was able to identify why event was an anomaly
- easily found button to filter events table to display only alerts

**Feedback**
- be explicit in axis and labels of graphs on dashboard
- time can play an important role in determining whether an event is actually anomalous
- include a rolling average in time series graphs
- would need to see activity of user to determine if activity is actually anomaly 
- label buttons
- be more clear in explaining what is abnormal in a specific finding
- have "tags" available to signify whether a user investigated a finding and determined whether its anomalous or not
- potentially have a comments section under finding pages so employees can communicate with each other
- account level information
- compare factors to norm

**Questions**
- Where are we getting data from when actually deployed in an organization?
- How will the model behind the scenes deal with non continuous variables in terms of explainability?



### Jacob Chmura (RBC AI Engineer Intern)
[View Interview Here](https://drive.google.com/file/d/1Vt8VStF4Lp6qavXwtB7MuLppKVQyZS9s/view?usp=sharing)

- found anomalous findings easily
- had a hard time understanding why finding was flagged as anomaly, could not immediately identify reasoning
- easily found button to filter events table to display only alerts

**Feedback**
- time is useful for determining anomaly
- system calls and area of memory might help determine anomaly
- helpful to have more on what to do after detection; step by step walkthrough, more info

**Questions**
- What level of abstraction is the model being portrayed as?

## Summary

When conducting the interviews, users were able to complete the given tasks typically with ease. This shows that the main workflow of the dashboard is clear and intuitive. The part where there was some difficulty was in task 2, identifying the most contributing factor for why an event is an anomaly. To remedy this, users suggested adding more comprehensive information regarding why a finding was considered anomalous. This can include additional user level data, time based information, or system call / memory segment information. Overall, the feedback recieved pointed to including more information so users can easily identifying if a flagged event is an actual threatful event or not.

Other feedback recieved to make the user experience better for analysts would be to include tags by events which would indicate whether this event is truly an anomaly or not. This would allow for users to clearly identify false positives and true positives, as well as also helping improve our model with labelled data. 

One question that was brought up in both our interview with Brian Lynch and [Raj Sivarajah](https://www.linkedin.com/in/rsivarajah/) (CISO of CI Financial) revolved around the data collection method. Other vendors typically employ the use of probes for cloud services and SIEM to aggregate internal company traffic. Although our MVP will make use of a dataset to train and test the model, it is valuable to understand how this task may be done in the future.

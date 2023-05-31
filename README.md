# STAY COOL - Ice Cream Truck Tracking App
## Overview
I absolutely adore ice cream trucks! The idea for this project stemmed from the inconvenience of not having a truck nearby when I was craving some delicious ice cream. With this application, users can effortlessly locate nearby trucks based on their current location and even access their operating hours. Furthermore, registered users have the ability to leave comments on the trucks they have visited. By utilizing this app, we can track ice cream trucks at our preferred times. Here's to everyone having a delightful ice cream experience!

### Deployment link
https://staycool.herokuapp.com/ 

### Timeframe & Working Team
This was a solo project, completed in the final week and a half (weeks 11-12) of the General Assembly software engineering course.

### Technologies Used
- Front end
![react](https://img.shields.io/badge/react-%2361DAFB.svg?&style=for-the-badge&logo=react&logoColor=white)
![sass](https://img.shields.io/badge/sass-%23CC6699.svg?&style=for-the-badge&logo=sass&logoColor=white)
![googlemaps](https://img.shields.io/badge/googlemaps-%234285F4.svg?&style=for-the-badge&logo=google-maps&logoColor=white)
- Back end
![django](https://img.shields.io/badge/django-%23092E20.svg?&style=for-the-badge&logo=django&logoColor=white)
![Python](https://img.shields.io/badge/Python-%233776AB.svg?&style=for-the-badge&logo=Python&logoColor=white)
![postgresql](https://img.shields.io/badge/postgresql-%234169E1.svg?&style=for-the-badge&logo=postgresql&logoColor=white)
- Storage/ Version control
![git](https://img.shields.io/badge/git-%23F05032.svg?&style=for-the-badge&logo=git&logoColor=white)
![npm](https://img.shields.io/badge/npm-%23CB3837.svg?&style=for-the-badge&logo=npm&logoColor=white)
![figma](https://img.shields.io/badge/figma-%23F24E1E.svg?&style=for-the-badge&logo=figma&logoColor=white)
![insomnia](https://img.shields.io/badge/insomnia-%234000BF.svg?&style=for-the-badge&logo=insomnia&logoColor=white)

## Plan

### Brief
- I utilized Django RESTful Framework to construct API and defined serializers to handle data serialization and deserialization. Routing was established to configure API endpoints. For the frontend, I used React and SASS. I utilized Google Cloud Platform (GCP) to incorporate the map functionality, and personally developed a custom database for each truck.
 
### Wireframe
<img alt="wireframe" src ="https://res.cloudinary.com/dpulji3ct/image/upload/v1685480994/wireframe-pj4_wfh0wj.png">
- As depicted in the provided wireframe, my plan was to have a main page featuring a map and a truck list. Clicking on each truck card would lead to an individual truck page. On the truck's single page, logged-in users would have the ability to leave comments.
- I created User, Profile, Truck, Review, and Menu models in Django. On the Truck Single page, truck-specific menus and reviews that should be exposed were linked to oneToMany.
The data necessary for Review created user name (Owner), rate (star), etc.
- And I wrote pseudocode for Django, which I am using for the first time. I started writing code after configuring CRUD by writing each field, model, and view. React wrote the pseudocode of the route, built the folder, and started writing the code.

## Process
### Django 
#### RESTful Framework
- In the initial 2 days I covered the Django REST framework. I created a project folder to handle the overall control of fields, as well as separate folders for each field's code. In the first step, I populated the fields in the Models. Then, for the second step, I implemented CRUD operations in the views. I also included functionality to create instances for serialization and convert them to JSON format. I utilized the is_valid method to validate the effectiveness of the serializer. In the third step, I added URLs and performed migrations. Throughout the process, I inserted data into the admin interface, completing all the necessary steps.
#### Data Relationship
- One of the most important aspects I considered in Django was the relationship between different data. I created the truck model first and used a ForeignKey in the review model to establish a relationship path with the truck model. Calculating the dependency relationships between data was crucial. I even had to redo the seeding process due to difficulties I encountered.

### React
- After completing the backend, I used React for the frontend. React felt much more convenient as I had previous experience using it frequently. To add map functionality to the frontend, I decided to use Google Cloud Platform (GCP) for the first time. Although the instructor recommended Mapbox, I personally had a strong affinity for Google Maps from my past travels, so I really wanted to use GCP.
#### Google Maps
- I obtained a Google Maps API key, installed and stored it in the secure .env file. I added the map component and integrated it with the backend data to display markers representing the locations of each truck on Google Maps. I extracted latitude and longitude from each truck's API data and used the isOpen method to show the truck information window when the marker is clicked.
#### Reviews
- Creating reviews was the most challenging part, and I'm still working on it. When entering the detailed page of each truck, only authenticated users can write reviews. The necessary APIs for this process were 1. truck information and 2. user ID. Only verified users were allowed to make POST requests. I added code to ensure that only verified users can make POST requests and, upon clicking the Submit button, I specified the data to be used for the review and stored it in a new review folder. By using useEffect, I fetched the list of reviews for each truck by default. Currently, the bug I have is that only the reviews of the logged-in user are shown, and I am still working on fixing it.

## Challenges & Bugs
### Challenges
#### Google Cloud Platform
- Using Google Maps was definitely the biggest challenge for me. And deploying it was a valuable learning experience as well. Since there wasn't much information available, I spent a lot of time dealing with Google Maps errors. One of the reasons why it didn't deploy on Heroku might have been due to copyright issues. Although I had securely stored my key in the env folder, I received an email saying that my key was exposed on GitHub. Upon examining my commits, I realized that I had mistakenly committed the Google Maps key in the Django settings folder. That's when I found the solution through a Google search: git filter-branch --tree-filter 'rm -f project/settings.py' --prune-empty HEAD. It removes all the commits related to that folder. I deleted all the commit history, pushed again, and deployed. It wasn't working on the same day, so I felt frustrated. However, when I checked a few days later, Google Maps was working perfectly.

### Bugs
#### Reviews
- Currently, there is a bug where only the reviews of the logged-in user are displayed. I am currently working on fixing this issue.

## Takeaways
- Django REST framework and SQL can be used together to manage data. It seems that they can also be used for marketing or sales analysis purposes.
- Google Cloud Platform (GCP) was utilized to integrate Google Maps into the frontend. I learned how to obtain a personal API key and securely store it in the "env" folder to prevent exposure. Additionally, I gained knowledge on setting latitude and longitude coordinates to generate markers on the map.
- I have developed a strong sense of confidence in handling data within React.

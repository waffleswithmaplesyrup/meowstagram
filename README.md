# Meowstagram - A Cat-Themed Instagram Clone

Meowstagram is a social media application that brings the world of Instagram into the world of cats. With a focus on cat lovers and enthusiasts, Meowstagram allows users to create cat-themed posts, interact with other users, and build a vibrant cat-loving community. This README provides an overview of the app and instructions for using it.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Deployment](#deployment)
- [How To Use](#how-to-use)
- [Design Process](#design-process)
- [Challenges](#challenges)
- [Key Learnings](#key-learnings)
- [Future Developments](#future-developments)
- [Summary](#summary)
- [References](#references)

## Introduction

Meowstagram is not just another social app; it's the ultimate destination for cat enthusiasts, designed to offer a delightful and immersive experience. Dive into the world of Meowstagram, where users can connect and share their love for all things feline. Whether you're a cat owner, a cat fanatic, or simply adore these adorable creatures, Meowstagram is the ideal place for you.

<img src="https://raw.githubusercontent.com/waffleswithmaplesyrup/meowstagram/main/public/readme/profile.png">

## Features

- **Cat-Themed Posts:** Share your cat-themed photos and videos, and connect with others who appreciate the charm of these furry friends.

- **Interact with Paw-sitivity:** Show your love for cats by liking and commenting on posts. Celebrate the cuteness with fellow Meowstagrammers.

- **Purrsonalized Feed:** Enjoy a curated feed filled with cat content from users you follow. It's like a constant stream of cat cuteness.

- **Discover Suggested Meowmates:** Explore recommended cat-loving accounts to expand your network and exchange cat stories and pictures.

- **Search Furriends:** Easily find and connect with other users by searching for their cat-inspired usernames.

- **Bookmark Your Favorite Moments:** Save the most adorable cat posts in your bookmarks for easy access.

- **Furr-tastic Cat Profiles:** Customize your profile with cat-themed avatars and usernames to express your inner cat.

- **All Animals Are Allowed!:** Meowstagram is inclusive for animal lovers everywhere. Post your dog pictures here. You have a sugar glider? Please post videos of them eating the cheese bug. Animals are love. Animals are life.

## Technologies Used

Meowstagram is built using the PERN stack:

- **PostgreSQL:** For the database to store user information, posts, and interactions.
- **Express.js:** For building the RESTful API server.
- **React:** For the front-end user interface.
- **Node.js:** For the server-side runtime environment.
- **JWT (JSON Web Tokens):** Used for user authentication.
- **Bcrypt:** Used to generate hashed passwords.
- **AWS S3 Bucket:** For storing user-uploaded media files.
- **Bootstrap and CSS:** For styling the app.

## Deployment

Meowstagram is deployed and hosted on [Render](https://render.com/). You can access Meowstagram by visiting the following URL: [Meowstagram](https://meowstagram.onrender.com/).

## How To Use

Using Meowstagram is straightforward:

1. **Sign Up:** If you're new to Meowstagram, sign up for an account with your email and create a cat-themed username and avatar.

2. **Log In:** If you already have an account, log in using your credentials.

3. **Create Posts:** Share your favorite cat photos and videos by creating new posts. Add captions to make your posts stand out.

4. **Engage with Others:** Like, comment, and follow other users to build your network of cat enthusiasts.

5. **Explore Your Feed:** Enjoy a personalized feed filled with posts from users you follow.

6. **Discover Suggested Users:** Check out the suggested users section to find more cat lovers to connect with.

7. **Search for Users:** Use the search feature to find specific users by their usernames.

8. **Bookmark Favorite Posts:** Save posts to your bookmarks to revisit them later.

9. **Access Bookmarked Posts:** Visit the Bookmarks page to view all your saved posts in one place.

<img src="https://raw.githubusercontent.com/waffleswithmaplesyrup/meowstagram/main/public/readme/signup.png">

<img src="https://raw.githubusercontent.com/waffleswithmaplesyrup/meowstagram/main/public/readme/home.png">

<img src="https://raw.githubusercontent.com/waffleswithmaplesyrup/meowstagram/main/public/readme/post.png">

## Design Process

The design of Meowstagram focuses on delivering a user-friendly and visually appealing interface. I have carefully designed the layout, color scheme, and user interactions on [Canva](https://www.canva.com/) to ensure an enjoyable social media experience. Here is a preview of my wireframe using Canva [Meowstagram on Canva](https://www.canva.com/design/DAFyD23ZidM/_m8pVD0njdZO5aImi9kOAw/view?utm_content=DAFyD23ZidM&utm_campaign=designshare&utm_medium=link&utm_source=editor).

Using [Trello](https://trello.com/), I created a workspace where I ask myself questions users would have when browsing social media. Click [here](https://trello.com/b/lFjUjOxr/meowstagram) to view my Trello workspace.

In order to store data, I need to know what are the entity relationships needed to effectively POST, DELETE, GET and PATCH relevant data. Using [Lucid Chart](https://www.lucidchart.com/pages/landing?utm_source=google&utm_medium=cpc&utm_campaign=_chart_en_tier3_mixed_search_brand_exact_&km_CPC_CampaignId=1484560207&km_CPC_AdGroupID=60168114191&km_CPC_Keyword=lucid%20chart&km_CPC_MatchType=e&km_CPC_ExtensionID=&km_CPC_Network=g&km_CPC_AdPosition=&km_CPC_Creative=442433234360&km_CPC_TargetID=kwd-55720648523&km_CPC_Country=9062513&km_CPC_Device=c&km_CPC_placement=&km_CPC_target=&gclid=CjwKCAjwkY2qBhBDEiwAoQXK5QM74ifkV_APJ7fM_eo46VfFtg1lK7ztcCE34l1mWtvR7Ks_x1AmWRoCUvkQAvD_BwE), I was able to come up with an Entity Relationship Diagram to visualise the relationships between the entities like users, posts, comments, followers. [Here](https://lucid.app/lucidchart/48224ff1-3f55-4496-b81b-526a9f120efb/edit?viewport_loc=114%2C-90%2C1646%2C1638%2C0_0&invitationId=inv_fca1f78a-809b-4f09-b2ea-69d7f89c168d) is my ERD for Meowstagram.

<img src="https://raw.githubusercontent.com/waffleswithmaplesyrup/meowstagram/main/public/readme/create.png">

## Challenges

Creating Meowstagram, comes with its own set of challenges. Here are some of the challenges faced:

- **Database Management:** Designing and maintaining a robust database schema to handle user data, posts, comments, likes, follows, and bookmarks.
- **File Uploads:** Managing the uploading and storage of user-generated media content (images and videos) efficiently and securely, which involved integrating with cloud storage services such as AWS S3.
- **News Feed Algorithm:** Developing an algorithm for curating and displaying a user's personalized feed, which involves sorting and randomising posts based on user's followers.
- **User Interactions:** Creating features for users to like, comment on, and bookmark posts, and ensuring data consistency in real-time.
- **User Search:** Implementing a search feature to help users find and follow other users based on usernames or keywords.
- **Follow and Unfollow System:** Building a system for users to follow/unfollow other users, updating followers' feeds.
- **Data Validation and Sanitization:** Implementing thorough data validation and sanitization to protect against security vulnerabilities, such as SQL injection and XSS attacks.
- **Error Handling:** Implementing error handling and user-friendly error messages for a seamless user experience.

## Key Learnings

Creating Meowstagram has provided me with valuable insight and key learnings about app development. Here are my findings:

- **Planning:** Writing code is not the hard part, it is knowing where and how to begin. Proper planning is essential. Creating wireframes and Entity Relationship Diagrams helped me understand the flow of the app. It helps me envision how to communicate the frontend with the backend. Writing the code flowed effortlesslessly once I knew what I want the app to look like and behave like.
- **Iterative Development:** Expect that my initial app version will need improvements. Regularly gathering user feedback and making iterative updates is key to success.

## Future Developments

I am committed to continuously improving Meowstagram. Here are some potential areas for future improvements and developments:

- **Enhanced User Experience:** Continuously improve the user interface and experience, making it even more intuitive, responsive, and enjoyable starting with sending users notifications when their content receives interaction.
- **Advanced Algorithms:** Develop more sophisticated algorithms for curating personalized feeds, suggesting content and users, and providing relevant recommendations.
- **Video Content:** Expand support for cat-themed video content, including live streaming, video stories, and better video handling.
- **Gamification:** Implement gamification elements to increase user engagement and interactivity, such as cat-themed challenges and rewards.
- **Geolocation Features:** Introduce location-based features to help users connect with fellow cat enthusiasts in their area or find cat-related events.
- **AI and Machine Learning:** Implement AI and machine learning for more advanced content recommendations, content analysis, and improved user interactions.
- **Augmented Reality (AR):** Consider AR features that allow users to overlay cat-related effects and filters on their photos and videos.
- **Safety and Reporting:** Enhance safety features by providing users with tools to report inappropriate content and interactions.
- **Integrated Shopping:** If feasible, integrate e-commerce features that allow users to purchase cat-related products directly through the platform.

## Summary

Meowstagram is a platform made by cat lovers, for cat lovers. So what are you waiting for? Join us and share the love for cats with the Meowstagram community. Your Cat-Loving Adventure Awaits! 🐾📸🐱 

## References

- [Instagram](https://www.instagram.com/)
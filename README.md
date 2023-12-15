# ZiPLix Ecommerce Website

## Introduction

ZiPLix is a full-stack ecommerce project developed to demonstrate advanced web development skills. This platform, created as a final project in a full-stack development course, encompasses a wide range of technologies and features, offering a seamless shopping experience for users.

![ZiPLix Screenshot](https://ecomm-project-ziplix.s3.amazonaws.com/ziplix.png)

## Live Demo

Visit the live version of ZiPlix [here](https://ziplix.netlify.app/).

## Features

### User Interface
- Detailed product pages with multiple images, specifications, and color options.
- Cart functionality allowing users to add items, adjust quantities, or remove products.
- Guest shopping capability with cart persistence using Local Storage.
- Search functionality with a dynamic, animated input field.
- Responsive design compatible with various devices and screen sizes.
- Horizontal slider showcasing 'Best Selling' products.

### Shopping Process
- Easy navigation to product and shop pages from the home page.
- Product pages with comprehensive details, image sliders, and color-dependent pricing.
- Cart drawer for immediate feedback on added items without leaving the product page.
- Seamless cart merging for guest users who later sign in.
- Checkout process with shipping information input and order summary.
- Order confirmation page detailing purchased items, total cost, and order date.

### Additional Enhancements
- Promotional header with sliding text effects for special offers.
- Dialogs for unimplemented features, enhancing visual appeal and future scalability.
- Dynamic update of cart item count displayed on the cart icon in the header.
- Hover effects on product listings for interactive user feedback.

### Technical Features
- Utilization of MVC architectural pattern for organized project structure.
- Integration of various middlewares for efficient request handling and validation.
- Implementation of user authentication and authorization using Passport.js.

## Technical Stack

### Front-End
- HTML, CSS, JavaScript for core web structure and styling.
- React and Redux for state management and dynamic user interfaces.
- React Router for seamless navigation between components.
- Material-UI (MUI) for specific components and modals.
- Deployment on Netlify for reliable and efficient hosting.

### Back-End
- Node.js and Express.js for server-side logic.
- Passport.js for secure user authentication.
- Postgres for robust data storage and management.
- AWS RDS for database hosting and AWS S3 for image storage.
- Deployment on Heroku for back-end hosting.

## Project Structure

- `server.js`: Configuration and setup of the application.
- `routes`: Modularized route definitions for different features.
- `models`: Database connection and SQL schema management.
- `controllers`: Business logic for handling requests.
- `view`: Front-end code, including React components and styles.
- `middleware`: Request validation and preprocessing.
- Additional configuration files and utilities for comprehensive project management.

## Project Motivation

The inception of ZiPLix, a full-scale ecommerce website, stemmed from my aspiration to consolidate and enhance my full-stack development skills. This project was not just a capstone to my learning journey in coding; it became a crucible for both applying what I had learned and discovering new dimensions of web development.

Prior to embarking on this journey, my experience was compartmentalized – understanding front-end and back-end development as separate entities, and having a grasp on relational databases. ZiPLix presented the unique challenge of integrating these elements into a cohesive, fully-functional web application. This holistic approach was both ambitious and enlightening, pushing the boundaries of my technical know-how and providing a real-world context to theoretical knowledge.

Building ZiPLix was more complex and demanding than initially anticipated. It morphed into an invaluable learning experience, where each line of code not only contributed to the functionality of the ecommerce platform but also to my personal and professional growth. This project was a testament to the power of practical application in learning – transforming theoretical understanding into a tangible, working model.

The journey of creating ZiPLix was instrumental in doubling my knowledge base. The challenges encountered and overcome, the integration of various technologies, and the successful deployment of a full-stack application, have all been pivotal in shaping my skills as a developer. ZiPLix is not just a project; it's a milestone in my coding career, symbolizing the transition from learning individual technologies to mastering the art of full-stack development.

## Technical Challenges

The journey of creating ZiPLix was filled with numerous technical challenges, each contributing significantly to my learning and development as a full-stack developer. Here are some of the major hurdles I encountered and overcame:

### Integrating Front-End, Back-End, and Database
- **Understanding Full-Stack Integration**: The initial challenge was conceptualizing how to integrate front-end, back-end, and database knowledge into a cohesive application.
- **Project Structure Decision**: Figuring out the project's directory structure was a daunting task. It required extensive research and led to the adoption of the MVC architectural pattern, clarifying the project layout.

### Development Approach and Sequence
- **Choosing the Starting Point**: I began with the back-end, crafting an API and structuring the database. However, this approach led to rework, as the front-end requirements altered the initial back-end design.
- **Adapting Development Sequence**: Building the back-end first posed challenges in anticipating the exact needs of the front-end. This experience taught me the importance of a more holistic approach in planning and developing full-stack applications.

### Relational Database Complexity
- **Designing the Database Schema**: Understanding the intricacies of a relational database, specifically Postgres, was challenging. Creating multiple related tables for products and users required a deep understanding of relational data.
- **Managing Complex Data Transactions**: Handling extensive JSON objects, especially for product information, demanded complex logic. It involved disassembling incoming JSON, storing data across various tables, and then reassembling it for retrieval, demanding comprehensive JOIN operations and data manipulation.

### Front-End and Back-End Integration
- **Conceptualizing Integration**: Understanding how front-end and back-end technologies work together was initially confusing. Grasping the roles of routing, state management, and database interactions in a full-stack environment was a significant learning curve.

### Front-End Component Development
- **Building Custom Components**: Developing complex React components, such as image sliders, and bigger components for pages, such as Product page and Account page components from scratch was challenging. It required a deep dive into React hooks and advanced features, enhancing my understanding of React.

### Deployment Challenges
- **Deployment Complexities**: Deploying a multi-faceted application across Netlify (front-end), Heroku (back-end), and AWS RDS (database) was a formidable task. It involved understanding and configuring cross-platform communication and troubleshooting numerous deployment-related issues.

### Emotional Resilience and Problem-Solving
- **Emotional Stability in Problem-Solving**: One of the most valuable lessons was maintaining emotional resilience during frustrating development phases. Persisting through tough challenges not only resolved technical issues but also contributed significantly to my personal growth.

This project was a comprehensive learning experience, filled with both large and small challenges. Each hurdle provided a new set of skills and a deeper understanding of full-stack development, making ZiPLix not just a project, but a significant milestone in my coding journey.

## Future Improvements

ZiPLix, as a dynamic and evolving project, has several planned enhancements to further improve functionality and user experience. Here are some key areas I aim to develop in the future:

- **Implement SSO with Google and Facebook**: Adding Single Sign-On (SSO) capabilities with popular platforms like Google and Facebook will streamline the sign-in/up process, enhancing user convenience.

- **Adding Real Payment Methods**: Integrating a reliable payment method, such as Stripe, to facilitate real transactions, enhancing the ecommerce functionality of the website.

- **Password Reset Feature**: Implementing a 'Forgot Password' feature to allow users to securely reset their passwords, improving account management and security.

- **Implementing Product Stock Check at Checkout**: Adding a feature to verify product availability during checkout. This ensures that products in the cart are still in stock when the user decides to complete their purchase.

- **Adding a Checkout Timer**: Implementing a timer (around 10-15 minutes) during checkout to reserve products, enhancing the buying process and managing stock more effectively.

- **Utilizing Google Map API for Shipping Addresses**: Integrating Google Map API to simplify and validate shipping address input, reducing user errors and improving data accuracy.

- **Enabling Product Reviews**: Allowing users to submit reviews for products. This feature not only adds credibility to the product listings but also provides valuable feedback for future customers.

- **Implementing Email Subscription**: Upgrading the email subscription feature from a visual placeholder to a functional system. This will involve setting up email services and managing subscriptions, offering a new learning opportunity.

- **Creating an Admin Interface**: Developing a dedicated admin page for managing the website's content and orders. This comprehensive feature will enable non-technical users to handle products, orders, and other administrative tasks through a user-friendly interface.

These future improvements reflect my commitment to continuously enhancing ZiPLix, ensuring it remains a robust, user-friendly, and feature-rich ecommerce platform. Each of these enhancements will not only elevate the user experience but also provide significant learning opportunities in various aspects of web development.

## Contributions

As this is a practice project, contributions are not actively sought. However, suggestions and feedback are always welcome.

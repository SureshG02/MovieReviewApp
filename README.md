# MovieReviewApp

Start back end application:

Prerequisite: Java 8 or higher version, Apache Maven 3
  
Go to movie-review-backend folder and run command "mvn install". After you see Build Success message run command "mvn spring-boot:run"
This will start spring boot backend application at 1035 port number.


Start front end application:

Prerequisite: npm 6 or higher version

Go to movie-review-frontend folder and run npm install. After successful installation run below commands:

npm test: Run test cases

npm start: Start react UI at 3000 port.

Note: If you do frequent movie search you might get 429 Too many request error since free tier NYT API has API call limit as mentioned here https://developer.nytimes.com/faq#a11
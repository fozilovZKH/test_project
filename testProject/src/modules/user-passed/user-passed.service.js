const { DataSource } = require("../../lib/dataSource.js");
const path = require("path");
const { ResData } = require("../../lib/resData.js");
const {
    UserPassedBadrequestException,
    UserPassedIdMustBeNumberException,
    TestNotFoundException,
    UserNotFoundException,
    UserHasTestException
} = require("./exception/user-passed.exception.js");
const {formatDate} = require("../../lib/formatDate.js")
const { generationId } = require("../../lib/generationId.js");
const { UserPassed } = require("../../lib/userPassedTestClass.js");

class UserPassedService{
    getAllUserPassed() {
        const userPassedPath = path.join(__dirname, "../../../database", "user_passed_tests.json");
    
        const userPassedDataSource = new DataSource(userPassedPath);
    
        const userPasseds = userPassedDataSource.read();
    
        const resData = new ResData("get all userPasseds", 200, userPasseds);
    
        return resData;
      }

      createUserPassed(body) {
        if (!body || !body.testId || !body.userId) {
          throw new UserPassedIdMustBeNumberException();
        }
            
        const userPassedDir = path.join(__dirname, "../../../database", "user_passed_tests.json");
        const testDir = path.join(__dirname, "../../../database", "tests.json");
        const testData = new DataSource(testDir);
        const userDir = path.join(__dirname, "../../../database", "users.json");
        const userData = new DataSource(userDir);
        const userPassedData = new DataSource(userPassedDir);
    
        const userPasseds = userPassedData.read();
        const users = userData.read();
        const tests = testData.read();
        
        const foundTest = tests.find((test) => test.id === body.testId);
        const foundUser = users.find((user) => user.id === body.userId);
        if (!foundTest) {
          throw new TestNotFoundException();
        }
        if (!foundUser) {
          throw new UserNotFoundException();
        }
        const foundUserPassed = userPasseds.find(
          (userPassed) => userPassed.test_id === body.testId && userPassed.user_id === body.userId);
        if (foundUserPassed) {
          throw new UserHasTestException();
        }
        if(body.totalQuestion < body.passedQuestion){
            throw new Error("Passed Question should be less than total question")
        }
        
        const newUserPassedId = generationId(userPasseds);
        const todayDate = new Date();
        const formatted = formatDate(todayDate); 
      
        const newUserPassed = new UserPassed(
          newUserPassedId,
          body.userId,
          body.testId,
          body.totalQuestion,
          body.passedQuestion,
          formatted
        );
        userPasseds.push(newUserPassed);
        userPassedData.write(userPasseds);
    
        const resData = new ResData("created userPassed test", newUserPassed);
    
        return resData;
      }

      getUserPassedById(id) {
        if (isNaN(id)) {
          throw new UserPassedIdMustBeNumberException();
        }
        const userPassedDir = path.join(__dirname, "../../../database", "user_passed_tests.json");
    
        const userPassedData = new DataSource(userPassedDir);
        const userPasseds = userPassedData.read();
    
        const foundUserPassed = userPasseds.find((userPassed) => userPassed.id===id);
        if (!foundUserPassed) {
          throw new TestNotFoundException();
        }
    
        const resData = new ResData("found UserPassed by id", 200, foundUserPassed);
    
        return resData;
      }

      deleteUserPassed(id){
        const { data: foundUserPassedById } = this.getUserPassedById(id);
        const userPassedDir = path.join(__dirname, "../../../database", "user_passed_tests.json");
    
        const userPassedData = new DataSource(userPassedDir);
        const userPasseds = userPassedData.read();
    
        const filterUserPassed = userPasseds.filter(
          (userPassed) => userPassed.id !== foundUserPassedById.id
        );
      
        userPassedData.write(filterUserPassed);
    
        const resData = new ResData("deleted test-question", 200, foundUserPassedById);
    
        return resData;
      }
}

module.exports = {UserPassedService}
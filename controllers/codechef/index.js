const puppeteer = require('puppeteer');

exports.usernameExist = async (req, res) => {
  console.log(req.params.username)
  const username = req.params.username;
  try {
    const browser = await puppeteer.launch({ 
      headless: true
    })
    const page = await browser.newPage()
    await page.setRequestInterception(true);
    page.on('request', request => {
      if (request.resourceType() === 'image' || request.resourceType() === 'media' || request.resourceType() === 'stylesheet')
        request.abort();
      else
        request.continue();
    });
    await page.goto(`https://www.codechef.com/users/${username}`,
    { waitUntil: 'domcontentloaded' });
    // await page.waitForSelector('div');
    const title = await page.title();
    console.log(title);
    if(title === "CodeChef User | CodeChef") {
      const innerText = await page.evaluate(() => document.querySelectorAll('h2')[1].innerText);
      await browser.close();
      res.send({
        status: "success",
        usernameExist: "yes",
        username: innerText,
        message: "User with given username exist"
      });
    }
    else {
      await browser.close();
      res.send({
        status: "success",
        usernameExist: "no",
        message: "User with given username does not exist"
      });
    }
  }
  catch (error) {
    res.send({
      status: "error",
      message: error
    });
  }    
};

exports.userDetails = async (req, res) => {
  console.log(req.params.username)
  const username = req.params.username;
  try {
    const browser = await puppeteer.launch({ 
      headless: true
    })
    const page = await browser.newPage()
    await page.setRequestInterception(true);
    page.on('request', request => {
      if (request.resourceType() === 'image' || request.resourceType() === 'media' || request.resourceType() === 'stylesheet')
        request.abort();
      else
        request.continue();
    });
    await page.goto(`https://www.codechef.com/users/${username}`,
    { waitUntil: 'domcontentloaded' });
    const title = await page.title();
    console.log(title);
    if(title === "CodeChef User | CodeChef") {
      
      const userDetails = await page.evaluate(() => {
        const userDetail = {
          userName: '',
          country: '',
          state: '',
          city: '',
          profession: '',
          institution: '',
        }
        const userSelector = document.getElementsByClassName('user-details')[0].querySelectorAll("ul")[0];
        userDetail.userName = userSelector.querySelectorAll("li")[0].querySelectorAll("span")[2].innerText;
        userDetail.country = userSelector.querySelectorAll("li")[1].querySelectorAll("span")[1].innerText;
        userDetail.state = userSelector.querySelectorAll("li")[2].querySelectorAll("span")[0].innerText;        
        userDetail.city = userSelector.querySelectorAll("li")[3].querySelectorAll("span")[0].innerText;
        userDetail.profession = userSelector.querySelectorAll("li")[4].querySelectorAll("span")[0].innerText;
        userDetail.institution = userSelector.querySelectorAll("li")[5].querySelectorAll("span")[0].innerText;       

        return userDetail;
      });
      await browser.close();
      res.send({
        status: "success",
        usernameExist: "yes",
        user: userDetails
      });
    }
    else {
      await browser.close();
      res.send({
        status: "success",
        usernameExist: "no",
        message: "User with given username does not exist"
      });
    }
  }
  catch (error) {
    res.send({
      status: "error",
      message: error
    });
  }
};

exports.problemsSolved = async (req, res) => {
  console.log(req.params.username)
  const username = req.params.username;
  try {
    const browser = await puppeteer.launch({ 
      headless: true
    })
    const page = await browser.newPage()
    await page.setRequestInterception(true);
    page.on('request', request => {
      if (request.resourceType() === 'image' || request.resourceType() === 'media' || request.resourceType() === 'stylesheet')
        request.abort();
      else
        request.continue();
    });
    await page.goto(`https://www.codechef.com/users/${username}`,
    { waitUntil: 'domcontentloaded' });
    const title = await page.title();
    console.log(title);
    if(title === "CodeChef User | CodeChef") {
      
      const problemsSolveds = await page.evaluate(() => {
        const problemsSolved = {
          fullySolved: 0,
          partiallySolved: 0
        }
        const fullySolvedString =  document.querySelectorAll('h5')[0].innerText;
        const partiallySolvedString =  document.querySelectorAll('h5')[1].innerText;
        problemsSolved.fullySolved = fullySolvedString.match(/\(([^)]+)\)/)[1];
        problemsSolved.partiallySolved = partiallySolvedString.match(/\(([^)]+)\)/)[1];
        return problemsSolved;
      });
      await browser.close();
      console.log(problemsSolveds.fullySolved);
      console.log(problemsSolveds.partiallySolved);
      res.send({
        status: "success",
        usernameExist: "yes",
        fullySolved: problemsSolveds.fullySolved,
        partiallySolved: problemsSolveds.partiallySolved,
      });
    }
    else {
      await browser.close();
      res.send({
        status: "success",
        usernameExist: "no",
        message: "User with given username does not exist"
      });
    }
  }
  catch (error) {
    res.send({
      status: "error",
      message: error
    });
  }
};

exports.rating = async (req, res) => {
  console.log(req.params.username)
  const username = req.params.username;
  try {
    const browser = await puppeteer.launch({ 
      headless: true
    })
    const page = await browser.newPage()
    await page.setRequestInterception(true);
    page.on('request', request => {
      if (request.resourceType() === 'image' || request.resourceType() === 'media' || request.resourceType() === 'stylesheet')
        request.abort();
      else
        request.continue();
    });
    await page.goto(`https://www.codechef.com/users/${username}`,
    { waitUntil: 'domcontentloaded' });
    const title = await page.title();
    console.log(title);
    if(title === "CodeChef User | CodeChef") {
      
      const ratings = await page.evaluate(() => {
        const rating = {
          rating: 0,
          stars: 0,
          highestRating: 0,
          globalRank: 0,
          countryRank: 0,
          longChallenge: {
            rating: 0,
            globalRank: 0,
            countryRank: 0,
          },
          cookOff: {
            rating: 0,
            globalRank: 0,
            countryRank: 0,
          },
          lunchTime: {
            rating: 0,
            globalRank: 0,
            countryRank: 0,
          }
        }
  
        const ratingHeader = document.getElementsByClassName('rating-header')[0];
        rating.rating = ratingHeader.querySelectorAll(".rating-number")[0].innerText;
        const highestRatingString =  ratingHeader.querySelectorAll("small")[0].innerText;
        rating.highestRating = highestRatingString.split(" ")[2].split(')')[0];
        rating.stars = ratingHeader.querySelectorAll(".rating-star")[0].innerText.length;
  
        const ratingRanks = document.getElementsByClassName('rating-ranks')[0];
        rating.globalRank = ratingRanks.querySelectorAll("strong")[0].innerText;
        rating.countryRank = ratingRanks.querySelectorAll("strong")[1].innerText;
  
        const contestBlock = document.getElementById('hp-sidebar-blurbRating');
  
        const longChallenge = contestBlock.querySelectorAll("tr")[1];
        rating.longChallenge.rating = longChallenge.querySelectorAll("td")[1].innerText;
        rating.longChallenge.globalRank = longChallenge.querySelectorAll("td")[2].innerText;
        rating.longChallenge.countryRank = longChallenge.querySelectorAll("td")[3].innerText;
  
        const cookOff = contestBlock.querySelectorAll("tr")[2];
        rating.cookOff.rating = cookOff.querySelectorAll("td")[1].innerText;
        rating.cookOff.globalRank = cookOff.querySelectorAll("td")[2].innerText;
        rating.cookOff.countryRank = cookOff.querySelectorAll("td")[3].innerText;
  
        const lunchTime = contestBlock.querySelectorAll("tr")[3];
        rating.lunchTime.rating = lunchTime.querySelectorAll("td")[1].innerText;
        rating.lunchTime.globalRank = lunchTime.querySelectorAll("td")[2].innerText;
        rating.lunchTime.countryRank = lunchTime.querySelectorAll("td")[3].innerText;
  
        return rating;
      });
      await browser.close();
      res.send({
        status: "success",
        usernameExist: "yes",
        rating: ratings
      });
    }
    else {
      await browser.close();
      res.send({
        status: "success",
        usernameExist: "no",
        message: "User with given username does not exist"
      });
    }
  }
  catch (error) {
    res.send({
      status: "error",
      message: error
    });
  }
};
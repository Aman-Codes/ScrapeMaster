const puppeteer = require('puppeteer');

exports.usernameExist = async (req, res) => {
  console.log(req.params.username)
  const username = req.params.username;
  try {
    const browser = await puppeteer.launch({ 
      headless: true,
    })
    const page = await browser.newPage()
    await page.setRequestInterception(true);
    
    page.on('request', request => {
      if (request.resourceType() === 'image' || request.resourceType() === 'media' || request.resourceType() === 'stylesheet') {
        request.abort();
      }        
      else {
        request.continue();
      }
    });

    // page.on('requestfailed', request => {
    //   console.log(`url: ${request.url()}, errText: ${request.failure().errorText}, method: ${request.method()}`)
    // });

    await page.goto(`https://leetcode.com/${username}`,
    { waitUntil: 'networkidle2' });
    
    // const dashboardResponse = await page.waitForResponse(response =>
    //   response.url()
    // );
    // console.log("status code is ", dashboardResponse.status());

    // await page.waitForSelector('span');    
    const title = await page.title();
    if (!title.includes("Page Not Found")) {
      const user = await page.evaluate(() => {
        const user = {
          userName: '',
          realName: '',
        }
        const userSelector = document.getElementsByClassName('ant-card-body')[0];
        user.userName = userSelector.querySelectorAll("span")[1].innerText;
        user.realName = userSelector.querySelectorAll("span")[0].innerText;
  
        return user;
      });
      await browser.close();
      res.send({
        status: "success",
        usernameExist: "yes",
        user: user,
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
    console.log(error);
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
      if (request.resourceType() === 'image' || request.resourceType() === 'media' || request.resourceType() === 'stylesheet') {
        request.abort();
      }        
      else {
        request.continue();
      }
    });
    await page.goto(`https://leetcode.com/${username}`,
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
      headless: true,
    })
    const page = await browser.newPage()
    await page.setRequestInterception(true);
    
    page.on('request', request => {
      if (request.resourceType() === 'image' || request.resourceType() === 'media' || request.resourceType() === 'stylesheet') {
        request.abort();
      }        
      else {
        request.continue();
      }
    });

    await page.goto(`https://leetcode.com/${username}`,
    { waitUntil: 'networkidle2' });

    const title = await page.title();
    if (!title.includes("Page Not Found")) {
      const problemsSolveds = await page.evaluate(() => {
        const problemsSolved = {
          total: {
            solved: 0,
            total: 0,
            percentage: 0,
          },
          easy: {
            solved: 0,
            total: 0,
            percentage: 0,
          },
          medium: {
            solved: 0,
            total: 0,
            percentage: 0,
          },
          hard: {
            solved: 0,
            total: 0,
            percentage: 0,
          },
          acceptance: 0
        };
        const userSelector = document.getElementsByClassName('ant-card-body')[1];

        problemsSolved.easy.solved = parseInt(userSelector.querySelectorAll("div")[14].querySelectorAll("span")[0].innerText);
        problemsSolved.easy.total = parseInt(userSelector.querySelectorAll("div")[14].querySelectorAll("span")[1].innerText);
        problemsSolved.easy.percentage = ((problemsSolved.easy.solved / problemsSolved.easy.total) * 100);

        problemsSolved.medium.solved = parseInt(userSelector.querySelectorAll("div")[15].querySelectorAll("span")[0].innerText);
        problemsSolved.medium.total = parseInt(userSelector.querySelectorAll("div")[15].querySelectorAll("span")[1].innerText);
        problemsSolved.medium.percentage = ((problemsSolved.medium.solved / problemsSolved.medium.total) * 100);

        problemsSolved.hard.solved = parseInt(userSelector.querySelectorAll("div")[18].querySelectorAll("span")[0].innerText);
        problemsSolved.hard.total = parseInt(userSelector.querySelectorAll("div")[18].querySelectorAll("span")[1].innerText);
        problemsSolved.hard.percentage = ((problemsSolved.hard.solved / problemsSolved.hard.total) * 100);

        problemsSolved.total.solved = parseInt(userSelector.querySelectorAll("div")[3].innerText);
        problemsSolved.total.total = parseInt(problemsSolved.easy.total + problemsSolved.medium.total + problemsSolved.hard.total);
        problemsSolved.total.percentage = ((problemsSolved.total.solved / problemsSolved.total.total) * 100);

        problemsSolved.acceptance = parseFloat(userSelector.querySelectorAll("div")[8].innerText);

        return problemsSolved;
      });
      await browser.close();
      res.send({
        status: "success",
        usernameExist: "yes",
        problemsSolved: problemsSolveds,
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
    console.log(error);
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
      if (request.resourceType() === 'image' || request.resourceType() === 'media' || request.resourceType() === 'stylesheet') {
        request.abort();
      }        
      else {
        request.continue();
      }
    });
    await page.goto(`https://leetcode.com/users/${username}`,
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
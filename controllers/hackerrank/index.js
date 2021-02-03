const puppeteer = require('puppeteer');

exports.usernameExist = async (req, res) => {
  console.log(req.params.username)
  const username = req.params.username;
  try {
    const browser = await puppeteer.launch({ 
      headless: false,
      slowMo: 50
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
    console.log(`https://www.hackerrank.com/${username}`);
    await page.goto(`https://www.hackerrank.com/${username}`,
    { waitUntil: 'domcontentloaded' });

    const title = await page.title();
    if(!title.includes("Page Not Found")) {
      const foundUsername = await page.evaluate(() => document.querySelectorAll('p.profile-username-heading')[0].innerText.substr(1));
      await browser.close();
      res.send({
        status: "success",
        usernameExist: "yes",
        username: foundUsername,
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

exports.verifiedSkills = async (req, res) => {
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
    await page.goto(`https://www.hackerrank.com/${username}`,
    { waitUntil: 'domcontentloaded' });

    const title = await page.title();
    if(!title.includes("Page Not Found")) {
      const verifiedSkills = await page.evaluate(() => {
        var verifiedSkill = [];
        const selector = document.querySelectorAll('div.hacker-certificates')[0];
        if(selector) {
          selector.querySelectorAll("a.hacker-certificate").forEach((item, index) => {
            verifiedSkill.push(item.querySelectorAll("h2.certificate-heading")[0].textContent.substr(13));
          });
        }
        return verifiedSkill;
      });
      await browser.close();
      res.send({
        status: "success",
        usernameExist: "yes",
        verifiedSkills: verifiedSkills,
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

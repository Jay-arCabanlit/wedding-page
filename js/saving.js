const api =
  "https://api-ap-northeast-1.hygraph.com/v2/clniskp4p10mn01t31tnzagsc/master";

console.log("hello");
function save() {
  console.log("gegegeg");
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var nuumber = document.getElementById("number").value;
  var eat_pork = document.getElementById("eat_pork").value;
  var be_there = document.getElementById("be_there").value;
  var message = document.getElementById("message").value;

  console.log(name, email, nuumber, eat_pork, be_there, message);

  const graphqlQuery = `mutation MyMutation {
        createRsvp(
          data: {fullName: ${name}, attend: ${be_there}, email: ${email}, message: ${message}, mobileNumber: ${nuumber}, nonePork: ${eat_pork}}
        ) {
          id
        }
      }  
    `;
}

function query() {
  const getdata = `query Rsvps {
        rsvps {
          attend
          createdAt
          email
          fullName
          id
          message
          mobileNumber
          nonePork
          publishedAt
          updatedAt
          visitorsId
        }
      }
      `;
  axios({
    url: api,
    method: "post",
    data: {
      query: getdata,
    },
  })
    .then((response) => {
      // Handle the GraphQL response here
      console.log(response.data);
    })
    .catch((error) => {
      // Handle errors here
      console.error(error);
    });
}

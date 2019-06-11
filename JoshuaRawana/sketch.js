var firebaseConfig = {
    apiKey: "AIzaSyCO8KHQI4Vhi_hEdTB_cxvZc93zoev6lPs",
    authDomain: "josh-397a0.firebaseapp.com",
    databaseURL: "https://josh-397a0.firebaseio.com",
    projectId: "josh-397a0",
    storageBucket: "",
    messagingSenderId: "567024903786",
    appId: "1:567024903786:web:84e95234aa221b15"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

let scoreboard = {  } 
let x 
let y 
let direction_h
let direction_v
let direction_h_2
let direction_v_2
let direction_h_3
let direction_v_3
let score
let time
let enemy_count
let enemy_count_2
let collect
let level
let name2 = document.getElementById("name")
let database = firebase.database ()

function setup() {
  createCanvas(windowWidth, windowHeight);
  s = width/458
  x=28
  y=49
  a= [150, 100, 50, 150,]
  b= [90, 200, 260, 360,]
  c=200
  d=100
  e=400
  f=60
  g= [90, 150, 250]
  h = [10, 100, 10]
  direction_h= [1, 1, 1, 1, 1, 1]
  direction_v= [1, 1, 1, 1, 1, 1]
  direction_h_2=1
  direction_v_2=1
  direction_h_3=[1, 1, 1, 1, 1, 1]
  direction_v_3=[1, 1, 1, 1, 1, 1]
  score=0
  time=10
  enemy_count=2
  enemy_count_2=1
  collect = false
  level = 1
}

function draw() {
  if (time > 0) {
    
  background(71, 209, 216);
  fill(226, 171, 20)
  circle(x*s,y,16*s)

 
  fill(150,160,22)
  
  square(c*s,d,40*s)
  

  
  for (i=0; i<enemy_count; i=i+1) {

    fill(20, 226, 47)
    circle(a[i]*s,b[i],15*s)
    a[i] = a[i] + 7*direction_h[i]
    b[i] = b[i] + 0*direction_v[i]

    if(a[i]*s>width || a[i]*s<0){
      direction_h[i]=direction_h[i]*-1
    }


    if(dist(x*s,y,a[i]*s,b[i])<16*s+15*s){
      score=score-5
    }
  }
  for (i=0; i<enemy_count_2; i=i+1) {
    fill(20, 226, 47)
    circle(g[i]*s,h[i],15*s)
    g[i] = g[i] + 0*direction_h_3[i]
    h[i] = h[i] + 7*direction_v_3[i]
  
    if(h[i]>height || h[i]<0){
      direction_v_3[i]=direction_v_3[i]*-1
    }
    if(dist(x*s,y,g[i]*s,h[i])<16*s+15*s){
      score=score-5
    }
}
   
  
  c = c + 5*direction_h_2
  d = d + 5*direction_v_2
  
 time=time-0.03
  
  
  if (keyIsDown(LEFT_ARROW)) {
    x=x-10
  }
   if (keyIsDown(RIGHT_ARROW)) {
     x=x+10
   }
  if (keyIsDown(UP_ARROW)) {
     y=y-10
   }
  if (keyIsDown(DOWN_ARROW)) {
     y=y+10
   }
  
  if(c*s>width || c*s<0){
    direction_h_2=direction_h_2*-1
  }
  if(d>height || d<0){
    direction_v_2=direction_v_2*-1
  }
  
  
  textSize(25)
  fill(0,0,0);
  text("Score: " + score,350,30)
  text("Time : " + time.toFixed(0), 150, 30)
  
  

  
  if(dist(x*s,y,c*s,d)<16*s+40*s){
     score=score+1
    
     }
  if (score > 25 && level == 1) {
    enemy_count=enemy_count + 2
    enemy_count_2=enemy_count_2 + 1
    level = 2
    a.push.apply(a, [300, 50])
    g.push.apply(g, [200])
    
  }
  if (score > 50 && level == 2) {
    enemy_count=enemy_count + 1
    enemy_count_2=enemy_count_2 + 2
    level = 3
    a.push.apply(a, [350])
    b.push.apply(b, [400])
    g.push.apply(g, [200, 270])
    h.push.apply(h, [10, 100])
  }
  
  if (score > 75 && level == 3) {
    enemy_count = enemy_count + 1
    enemy_count_2 = enemy_count_2 + 2
    level = 4
    a.push.apply(a, [50])
    b.push.apply(b, [430])
    g.push.apply(g, [310, 360])
    h.push.apply(h, [10, 100])
  }
  
  if (score < 25 && level == 2) {
    enemy_count = enemy_count - 2
    enemy_count_2 = enemy_count_2 -1
    level = 1
  }
  
  if (score < 50 && level == 3) {
    enemy_count = enemy_count - 1
    enemy_count_2 = enemy_count_2 - 2
    level = 2
  }
  
  if (score < 75 && level == 4) {
    enemy_count = enemy_count - 1
    enemy_count_2 = enemy_count_2 - 2
    level = 3
  }
                
  }
  else {
    name2.innerHTML = "Name? <input id = input><button onclick='restart()'>Restart</button> <button onclick='generate_alltime_leaderboard()'>all_time_leaderboard</button>"
    noLoop()
  }
}

function restart() {
  let input = document.getElementById("input")
  name = input.value
  database.ref(name).set(score)
  if (name != "") {
    scoreboard[name] = score
  }
  alert("Scoreboard:" + JSON.stringify(scoreboard,null,1))
  time = 10
  score = 0
  level = 1
  enemy_count = 2
  enemy_count_2 = 1
  x=28
  y=49
  loop()
  name2.innerHTML = ""
  generate_leaderboard()
}

function generate_leaderboard() {
  scores = Object.values(scoreboard)
  names = Object.keys(scoreboard)
  
  if (scores.length >= 3) {
    let leaderboard = { }
    for (i=0; i<3; i=i+1) {
      max = Math.max(...scores)
      index = scores.indexOf(max)
      leaderboard[names[index]] = max
      names.splice(index,1)
      scores.splice(index,1)
    }
    alert("Leaderboard: " + JSON.stringify(leaderboard,null,1))
  }
}

function generate_alltime_leaderboard() {
	let alltime_leaderboard = { }
	database.ref().orderByValue().limitToLast(3).on("value", function(snapshot) {
		snapshot.forEach(function(data) {
		alltime_leaderboard[data.key] = data.val()
		});
    	});
	if (Object.values(alltime_leaderboard).length > 0) {
	  alert("All-time leaderboard: " + JSON.stringify(alltime_leaderboard,null,1))
    	}
}

generate_alltime_leaderboard()


/*
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    x=x-30;
  }
  if (keyCode === RIGHT_ARROW) {
    x=x+30;
  }
  if (keyCode === UP_ARROW) {
    y=y-30;
  }
  if (keyCode === DOWN_ARROW) {
    y=y+30;
  }

}
*/
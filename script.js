const music = new Audio("audio/1.mp3");
// music.play();
// create a array

const songs = [
  {
    id: "1",
    songName: `  Aayat <br>
        <div class="subtitle">Arijit singh</div>`,
    poster: "img/1.jpg",
  },
  {
    id: "2",
    songName: `Atak Gaya<br>
        <div class="subtitle">Arijit singh</div>`,
    poster: "img/2.jpg",
  },
  {
    id: "3",
    songName: ` Raanjhana<br>
        <div class="subtitle">Arijit singh</div>`,
    poster: "img/3.jpg",
  },
  {
    id: "4",
    songName: `Hum Nashe Mein toh <br>
        <div class="subtitle">Arijit singh</div>`,
    poster: "img/4.jpg",
  },
  {
    id: "5",
    songName: `Illahi<br>
        <div class="subtitle">Arijit singh</div>`,
    poster: "img/5.jpg",
  },
  {
    id: "6",
    songName: `Laal Ishq<br>
        <div class="subtitle">Arijit singh</div>`,
    poster: "img/6.jpg",
  },
  {
    id: "7",
    songName: ` Phir bhe tum ko chaahuga<br />
    <div class="subtitle">Arijit singh</div>`,
    poster: "img/7.jpg",
  },
  {
    id: "8",
    songName: `Aabaad Barbaad<br>
        <div class="subtitle">Arijit singh</div>`,
    poster: "img/8.jpg",
  },
  {
    id: "9",
    songName: `Raabat<br>
        <div class="subtitle">Arijit singh</div>`,
    poster: "img/9.jpg",
  },
  {
    id: "10",
    songName: `Tadpati Hai Teri Baatein<br>
        <div class="subtitle">Arijit singh</div>`,
    poster: "img/10.jpg",
  },
  {
    id: "11",
    songName: `Tose Naina<br>
        <div class="subtitle">Arijit singh</div>`,
    poster: "img/11.jpg",
  },
  {
    id: "12",
    songName: `Tu Har Lamha<br>
        <div class="subtitle">Arijit singh</div>`,
    poster: "img/12.jpg",
  },
  {
    id: "13",
    songName: `Zindagi song<br>
        <div class="subtitle">Arijit singh</div>`,
    poster: "img/13.jpg",
  },
  {
    id: "14",
    songName: `Aaj Phir<br>
        <div class="subtitle">Arijit singh</div>`,
    poster: "img/14.jpg",
  },
  {
    id: "15",
    songName: `Judaa<br>
        <div class="subtitle">Arijit singh</div>`,
    poster: "img/15.jpg",
  },
  //remaining
];

Array.from(document.getElementsByClassName("songItem")).forEach(
  (element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].poster;
    element.getElementsByClassName("flex")[0].innerHTML = songs[i].songName;
  }
);

const masterPlay = document.getElementById("masterPlay");
let wave = document.getElementsByClassName("wave")[0];
masterPlay.addEventListener("click", () => {
  if (music.paused || music.currentTime <= 0) {
    music.play();
    masterPlay.classList.remove("bi-play-fill");
    masterPlay.classList.add("bi-pause-fill");
    wave.classList.add("active2");
  } else {
    music.pause();
    masterPlay.classList.add("bi-play-fill");
    masterPlay.classList.remove("bi-pause-fill");
    wave.classList.remove("active2");
  }
});

const makeAllPlay = () => {
  Array.from(document.getElementsByClassName("playList")).forEach((element) => {
    element.classList.add("bi-play-circle-fill");
    element.classList.remove("bi-pause-circle-fill");
  });
};
const makeAllBackgrounds = () => {
  Array.from(document.getElementsByClassName("songItem")).forEach((element) => {
    element.style.background = "rgb(105,105,107,0)";
  });
};

let index = 0;
let poster_master_play = document.getElementById("poster_master_play");
let title = document.getElementById("title");
Array.from(document.getElementsByClassName("playList")).forEach((element) => {
  element.addEventListener("click", (event) => {
    index = event.target.id;

    makeAllPlay();
    event.target.classList.remove("bi-play-circle-fill");
    event.target.classList.add("bi-pause-circle-fill");
    music.src = `audio/${index}.mp3 `;
    poster_master_play.src = `img/${index}.jpg`;
    music.play();

    let song_title = songs.filter((ele) => {
      return ele.id == index;
    });

    song_title.forEach((ele) => {
      let { songName } = ele;
      title.innerHTML = songName;
    });
    masterPlay.classList.remove("bi-play-fill");
    masterPlay.classList.add("bi-pause-fill");
    wave.classList.add("active2");
    music.addEventListener("ended", () => {
      masterPlay.classList.add("bi-play-fill");
      masterPlay.classList.remove("bi-pause-fill");
      wave.classList.remove("active2");
    });
    makeAllBackgrounds();
    Array.from(document.getElementsByClassName("songItem"))[
      `${index - 1}`
    ].style.background = "rgb(105,105,107,.1)";
  });
});

let currentStart = document.getElementById("currentStart");
let currentEnd = document.getElementById("currentEnd");
let seek = document.getElementById("seek");
let bar2 = document.getElementById("bar2");
let dot = document.getElementsByClassName("dot")[0];

music.addEventListener("timeupdate", () => {
  let music_curr = music.currentTime;
  let music_dur = music.duration;

  let min = Math.floor(music_dur / 60);
  let sec = Math.floor(music_dur % 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  currentEnd.innerHTML = `${min}:${sec}`;

  let min1 = Math.floor(music_curr / 60);
  let sec1 = Math.floor(music_curr % 60);
  if (sec1 < 10) {
    sec1 = `0${sec1}`;
  }
  currentStart.innerHTML = `${min1}:${sec1}`;

  let progressBar = parseInt((music.currentTime / music.duration) * 100);
  seek.value = progressBar;
  let seekBar = seek.value;
  bar2.style.width = `${seekBar}%`;
  dot.style.left = `${seekBar}%`;
});
seek.addEventListener("change", () => {
  music.currentTime = (seek.value * music.duration) / 100;
});

music.addEventListener("ended", () => {
  masterPlay.classList.add("bi-play-fill");
  masterPlay.classList.remove("bi-pause-fill");
  wave.classList.remove("active2");
});

let vol_icon = document.getElementById("vol_icon");
let vol = document.getElementById("vol");
let vol_dot = document.getElementById("vol_dot");
let vol_bar = document.getElementsByClassName("vol_bar")[0];

vol.addEventListener("change", () => {
  if (vol.value == 0) {
    vol_icon.classList.remove("bi-volume-down-fill");
    vol_icon.classList.add("bi-volume-mute-fill");
    vol_icon.classList.remove("bi-volume-up-fill");
  }
  if (vol.value > 0) {
    vol_icon.classList.add("bi-volume-down-fill");
    vol_icon.classList.remove("bi-volume-mute-fill");
    vol_icon.classList.remove("bi-volume-up-fill");
  }
  if (vol.value > 50) {
    vol_icon.classList.remove("bi-volume-down-fill");
    vol_icon.classList.remove("bi-volume-mute-fill");
    vol_icon.classList.add("bi-volume-up-fill");
  }
  let vol_a = vol.value;
  vol_bar.style.width = `${vol_a}%`;
  vol_dot.style.left = `${vol_a}%`;
  music.volume = vol_a / 100;
});

let back = document.getElementById("back");
let next = document.getElementById("next");

back.addEventListener("click", () => {
  index -= 1;
  if (index < 1) {
    index = Array.from(document.getElementsByClassName('songItem')).length;
  }
  music.src = `audio/${index}.mp3 `;
  poster_master_play.src = `img/${index}.jpg`;
  music.play();

  let song_title = songs.filter((ele) => {
    return ele.id == index;
  });

  song_title.forEach((ele) => { 
    let { songName } = ele;
    title.innerHTML = songName;
  });
  makeAllPlay();
  document.getElementById(`${index}`).classList.remove("bi-play-fill");
  document.getElementById(`${index}`).classList.add("bi-pause-fill");
  makeAllBackgrounds();
  Array.from(document.getElementsByClassName("songItem"))[
    `${index - 1}`
  ].style.background = "rgb(105,105,107,.1)";
});
next.addEventListener("click", () => {
  index -= 0;
  index += 1;
  if (index > Array.from(document.getElementsByClassName('songItem')).length) {
    index = 1;
  }
  music.src = `audio/${index}.mp3 `;
  poster_master_play.src = `img/${index}.jpg`;
  music.play();

  let song_title = songs.filter((ele) => {
    return ele.id == index;
  });

  song_title.forEach((ele) => { 
    let { songName } = ele;
    title.innerHTML = songName;
  });
  makeAllPlay();
  document.getElementById(`${index}`).classList.remove("bi-play-fill");
  document.getElementById(`${index}`).classList.add("bi-pause-fill");
  makeAllBackgrounds();
  Array.from(document.getElementsByClassName("songItem"))[
    `${index - 1}`
  ].style.background = "rgb(105,105,107,.1)";
});

// -------
let left_scroll = document.getElementById("leftScroll");
let right_scroll = document.getElementById("rightScroll");
let inline = document.getElementsByClassName("inline")[0];

left_scroll.addEventListener("click",()=>{
  inline.scrollLeft -=330;
});
right_scroll.addEventListener("click",()=>{
  inline.scrollLeft +=330;
});

let leftScrolls = document.getElementById("leftScrolls");
let rightScrolls = document.getElementById("rightScrolls");
let item = document.getElementsByClassName("item")[0];

leftScrolls.addEventListener("click",()=>{
  item.scrollLeft -=330;
});
rightScrolls.addEventListener("click",()=>{
  item.scrollLeft +=330;
});



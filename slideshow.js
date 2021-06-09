'use strict';

{
  // スライドに使うイメージファイルを配列で用意し変数で何番目の要素かわかるように設定。
  const imgs = [
    "img/1.jpg",
    "img/2.jpg",
    "img/3.jpg",
    "img/4.jpg",
    "img/5.jpg",
    "img/6.jpg",
    "img/7.jpg",
    "img/8.jpg",
    "img/9.jpg",
    "img/10.jpg",
    "img/11.jpg",
    "img/12.jpg",
    "img/13.jpg",
    "img/14.jpg",
    "img/15.jpeg",
    "img/16.jpeg",
    "img/17.jpeg",
    "img/18.jpeg",
    "img/19.jpeg",
    "img/20.jpeg",
  ]
  let currentIndex = 0;

  // mainIDを取得しそこのsrcに指定されたイメージファイルを挿入。
  const mainImg = document.getElementById("main");
  mainImg.src = imgs[currentIndex];

  // img要素を作成しそこのsrcにイメージファイルを数分挿入。
  // li要素を作成しimg要素を挿入。
  // 指定されたイメージファイルにcurrentクラスを付与。
  // li要素にクリックイベントを付与しクリックされたらmainImgに代入。
  // thumbnailsクラスのli要素を取得しクリックされたら前のli要素からcurrentクラスを外し次のli要素にcurrentクラスを付与。
  // thumbnailsクラスにli要素を全て挿入。
  imgs.forEach((imag, index) => {
    const img = document.createElement("img");
    img.src = imag;

    const li = document.createElement("li");
    if (index === currentIndex) {
      li.classList.add("current");
    }
    li.addEventListener("click", () => {
      mainImg.src = imag;
      const thumbnails = document.querySelectorAll(".thumbnails > li");
      thumbnails[currentIndex].classList.remove("current");
      currentIndex = index;
      thumbnails[currentIndex].classList.add("current");
    });
    li.appendChild(img);
    document.querySelector(".thumbnails").appendChild(li);
  });

  // nextIDを取得しクリックイベントを付与しクリックされたら次のイメージファイルに移動し最後まで行ったら最初に戻るよう設定。
  const next = document.getElementById("next");
  next.addEventListener("click", () => {
    let target = currentIndex + 1;
    if (target === imgs.length) {
      target = 0;
    }
    document.querySelectorAll(".thumbnails > li")[target].click();
  });

  // prevIDを取得しクリックイベントを付与しクリックされたら前のイメージファイルに移動し最初まで行ったら最後に行くように設定。
  const prev = document.getElementById("prev");
  prev.addEventListener("click", () => {
    let target = currentIndex - 1;
    if (target < 0) {
      target = imgs.length - 1;
    }
    document.querySelectorAll(".thumbnails > li")[target].click();
  });

  // スライドの動きを設定。
  let timeoutId;
  function playSlideShow() {
    timeoutId = setTimeout(() => {
      next.click();
      playSlideShow();
    }, 1000);
  }

  // playIDを取得しクリックイベントを付与しクリックされたらテキストが停止に変更しスライドがスタート、もう一度クリックされたらテキストが再生に変更しスライドをストップ。
  let isPlaying = false;
  const play = document.getElementById("play");
  play.addEventListener("click", () => {
    if (isPlaying === false) {
      playSlideShow();
      play.textContent = "停止";
    } else {
      clearTimeout(timeoutId);
      play.textContent = "再生";
    }
    isPlaying = !isPlaying;
  });
}
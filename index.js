const imageSection = document.getElementById("image-parent");
const dotsContainer = document.getElementById("slides_dots");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const slidesContainer = document.getElementById("slides")
const images = [
  { id: 0, imageUrl: "/images/1.jpg" },
  { id: 1, imageUrl: "/images/2.jpg" },
  { id: 2, imageUrl: "/images/3.jpg" },
  { id: 3, imageUrl: "/images/4.jpg" },
  { id: 4, imageUrl: "/images/5.jpg" },
  { id: 5, imageUrl: "/images/6.jpg" },
  { id: 6, imageUrl: "/images/7.jpg" },
  { id: 7, imageUrl: "/images/8.jpg" },
  { id: 7, imageUrl: "/images/9.jpg" },
];

let allImage;
let counter = 0;
const addImageInSlides = () => {
  images.forEach((img, index) => {
    const fromLeft = index * 100;
    const image = document.createElement("img");
    image.src = img.imageUrl;
    image.classList.add(
      "img",
      "w-full",
      "h-[90%]",
      "object-cover",
      "rounded-md",
      "absolute",
      "mr-2",
      `left-[${fromLeft}%]`,
      "transition-transform",
      "duration-1000",
      "ease-in-out"
    );
    imageSection.appendChild(image);
  });
  allImage = document.getElementsByTagName("img");
};

addImageInSlides();

const showAndHideArrow = () =>{
 
  (counter === allImage.length-1) ?  next.classList.add("hidden") : next.classList.remove("hidden");

  (counter === 0 ) ? prev.classList.add("hidden") : prev.classList.remove("hidden");
}
const slideImage = () => {
  for (let i = 0; i < allImage.length; i++) {
    let count = counter * 100;
    allImage[i].style.transform = `translateX(-${count}%)`;
  }
};

const goPrev = () => {
  counter--;
  if (counter < 0) {
    counter = 0;
  }
  showAndHideArrow();
  slideImage();
};

const goNext = () => {
  counter++;
  if (counter > images.length - 1) {
    counter = images.length - 1;
  }
  showAndHideArrow();
  slideImage();
};
let intervalRef
const autoSlide = () => {
  intervalRef = setInterval(()=>{
    counter++;
    showAndHideArrow();
    if (counter >= images.length) {
      counter = 0;
    }
    showAndHideArrow();
    highlightDot(counter)
    slideImage();
  }, 5000);
};

autoSlide();
next.addEventListener("click", () => {
  goNext();
  highlightDot(counter);
});

prev.addEventListener("click", () => {
  goPrev();
  highlightDot(counter);
});

// Create dots corresponding to each image
images.forEach((img, index) => {
  const dot = document.createElement("button");
  dot.classList.add(
    "btn",
    "w-2",
    "h-2",
    "ml-1",
    "rounded-[50%]",
    "bg-gray-300",
    "hover:bg-blue-400",
    "2xl:w-4", "2xl:h-4"
  );
  // console.log(dot.dataset.index );
  dot.dataset.index = index; // Store index information in dataset
  dotsContainer.appendChild(dot);

  // Add click event listener to each dot
  dot.addEventListener("click", (e) => {
    const clickedIndex = parseInt(e.target.dataset.index);
    console.log(e);
    console.log(clickedIndex);
    counter = clickedIndex; // Set counter to clicked index
    slideImage();// Slide to the selected image
    highlightDot(counter)
  });
});

// Function to highlight the current dot
const highlightDot = (index) => {
  const dots = dotsContainer.querySelectorAll("button");
  dots.forEach((dot, i) => {
    if (i === index) {
      dot.classList.add("bg-blue-400"); // Add active class to current dot
    } else {
      dot.classList.remove("bg-blue-400"); // Remove active class from other dots
    }
  });
};

// Function to initialize the slider when the page loads
const initializeSlider = () => {
    slideImage(); // Show the first image
    highlightDot(counter); // Highlight the corresponding dot
    showAndHideArrow()

  };
  
  // Call the initializeSlider function when the page loads
  window.addEventListener('load', initializeSlider);

prev.addEventListener("mouseenter",()=>{
    clearInterval(intervalRef);
  })

  prev.addEventListener("mouseleave",()=>{
  //  intervalRef= setInterval(autoSlide, 5000);
  autoSlide();
  })

  next.addEventListener("mouseenter",()=>{
    clearInterval(intervalRef);
  })

  next.addEventListener("mouseleave",()=>{
  //  intervalRef= setInterval(autoSlide, 5000);
  autoSlide();
  })

  dotsContainer.addEventListener("mouseenter",()=>{
    clearInterval(intervalRef);
  })

  dotsContainer.addEventListener("mouseleave",()=>{
  //  intervalRef= setInterval(autoSlide, 5000);
  autoSlide();
  })

  
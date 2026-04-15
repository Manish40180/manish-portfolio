/* Typing Effect */
const text = "Software Developer";
let i = 0;

function typing(){
    if(i < text.length){
        document.getElementById("typing").innerHTML += text.charAt(i);
        i++;
        setTimeout(typing, 80);
    }
}
typing();

/* Scroll Animation */
const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
});

document.querySelectorAll('.fade').forEach(el=>{
    observer.observe(el);
});

/* Fake Contact Submit */

const elements = document.querySelectorAll(".fade-up");

window.addEventListener("scroll", () => {
  elements.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.classList.add("show");
    }
  });
});
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  emailjs.sendForm(
  "service_gkjcumd",
  "template_gwls43m",   // ✅ correct one
  this
)
  .then(function() {
    alert("✅ Message sent successfully!");
    document.getElementById("contactForm").reset();
  }, function(error) {
    alert("❌ Failed to send message");
    console.log(error);
  });
});

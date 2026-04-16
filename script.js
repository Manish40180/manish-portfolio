
/* =========================
   SCROLL ANIMATION (FADE-UP)
========================= */
const fadeElements = document.querySelectorAll(".fade-up");

fadeElements.forEach((el, index) => {
  setTimeout(() => {
    el.classList.add("show");
  }, index * 200); // delay between cards
});


/* =========================
   CONTACT FORM (EMAILJS)
========================= */
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs.sendForm(
    "service_gkjcumd",
    "template_gwls43m",
    this
  ).then(
    function () {
      alert("✅ Message sent successfully!");
      document.getElementById("contactForm").reset();
    },
    function (error) {
      alert("❌ Failed to send message");
      console.log(error);
    }
  );
});
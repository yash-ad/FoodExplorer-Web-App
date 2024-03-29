

const Contact = () => {
  return (
    <div className="contact-page">
      <div id="contact">
        <img src="https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png" alt="" />
        <div id="overlay"></div>
        <div id="contact-left">
          <h1>Reach out to us</h1>
          <p>Require help or have inquiries? Reach out to our approachable team for prompt and supportive assistance.</p>
        </div>
        <div id="contact-right">
          <label htmlFor="name" className="name-label">Name</label>
          <input type="text" id="name" placeholder="Eg: Yash Dandnaik" />
          <label htmlFor="email" className="email-label">Email</label>
          <input type="email" id="email" placeholder="abc@gmail.com" />
          <label htmlFor="message">Tell Us More</label>
          <textarea id="message" placeholder="Message" cols="20" rows="10"></textarea>
          <button>Send Message</button>
        </div>
      </div>
    </div>
  );
};

export default Contact;

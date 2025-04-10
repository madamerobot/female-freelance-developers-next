import { useState } from "react";

/* components */
import Head from "../../components/Head";
import Header from "../../components/Header";

export default function Submit() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    website: "",
    email: "",
    socialUrl: "",
    expertise: "",
    location: "",
    approved: "No",
  });

  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let url =
      "https://api.sheety.co/5170e23598c9a17c11d3f0577571efe2/femaleFreelanceDevelopers/list";

    let body = {
      list: {
        ...form,
      },
    };

    if (
      form.firstName &&
      form.lastName &&
      form.website &&
      form.email &&
      form.expertise
    ) {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.list) {
            setStatus(
              "Thanks for submitting! We will now review your application."
            );
          } else {
            setStatus("Oh no, something went wrong!");
          }
        });
    } else {
      setStatus("Please make sure you fill in all mandatory fields.");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [`${e.target.id}`]: e.target.value });
  };

  return (
    <main>
      <Head />
      <div className="layout-wrapper">
        <div className="side-col">
          <div className="side-col--section">
            <h3 id="manifest">The Manifest</h3>
            <p>
              It is hard to find female (identifying) freelance developers! This
              list shall help you to get a more diverse selection of cool people
              to make the best choice for your project.
            </p>
          </div>
          <div className="side-col--section">
            <h3>How to ask</h3>
            <p>
              Here are some helpful questions to answer when you approach a
              developer for a project:
            </p>
            <ul>
              <li>Does the job include only development or also design?</li>
              <li>
                Which technologies have to be used or does the developer have
                free choice?
              </li>
              <li>What is the budget and the timeline? :)</li>
              <li>Do you have reference links to websites you like?</li>
            </ul>
          </div>
          <div className="side-col--section">
            <h3>Get listed</h3>
            <p>
              Alrighty! You can submit your details through{" "}
              <a href="/submit">this form.</a>
            </p>
          </div>
          <div className="side-col--section side-logo">
            <a href="https://cafe-robot.co/">
              <img src="cafe-robot-logo.png" alt="Cafe Robot Logo" />
            </a>
          </div>
        </div>
        <div className="main-col">
          <Header />
          <div className="submit-form-wrapper">
            <a className="back-item" href="/">
              ← Back to list
            </a>
            <h3>Join us!</h3>
            <p>
              Hi there! Thanks for wanting to be a part of the crew. Please fill
              in your details below and we will review your submission.
            </p>
            <h3>Must haves</h3>
            <ul>
              <li>A website which clearly displays your work</li>
              <li>A couple of client projects</li>
            </ul>
            <p>
              If approved, your site will get listed within a few days. If you
              get any cool work or other opportunities through us, let me know (
              <a href="mailto:valerie@cafe-robot.co" target="_blank">
                ↗email
              </a>{" "}
              or{" "}
              <a href="https://www.instagram.com/madame_robot/" target="_blank">
                ↗Instagram
              </a>
              ). I am always happy to hear your stories and might feature them
              in the future.
            </p>
            <div>
              <form onChange={handleChange}>
                <input
                  type="text"
                  placeholder="First name*"
                  id="firstName"
                  defaultValue={form.firstName}
                  required
                />
                <input
                  type="text"
                  placeholder="Last name*"
                  id="lastName"
                  defaultValue={form.lastName}
                  required
                />
                <input
                  type="text"
                  placeholder="Website*"
                  id="website"
                  defaultValue={form.website}
                  required
                />
                <input
                  type="email"
                  placeholder="Email*"
                  id="email"
                  defaultValue={form.email}
                  required
                />
                <textarea
                  rows="3"
                  cols="1"
                  placeholder="Expertise*"
                  id="expertise"
                  defaultValue={form.expertise}
                  required
                />
                <input
                  type="text"
                  placeholder="Location"
                  defaultValue={form.location}
                  id="location"
                />
                <input
                  type="text"
                  placeholder="Social url (Instagram, Twitter, ..)"
                  defaultValue={form.socialUrl}
                  id="socialUrl"
                />
                <button type="submit" onClick={handleSubmit}>
                  Submit
                </button>
              </form>
              {status && <p className="status">{status}</p>}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

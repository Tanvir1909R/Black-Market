import React from "react";

const Blog = () => {
  return (
    <div className="Container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-40">
      <div className="p-5 border rounded-lg">
        <h1 className="text-2xl mb-5">
          What are the different ways to manage a state in a React application?
        </h1>
        <p>
          The Four Kinds of React State to Manage Local state. Global state.
          Server state. URL state.
        </p>
      </div>
      <div className="p-5 border rounded-lg">
        <h1 className="text-2xl mb-5">
          What is a unit test? Why should we write unit tests?
        </h1>
        <p>
          The main objective of unit testing is to isolate written code to test
          and determine if it works as intended. Unit testing is an important
          step in the development process, because if done correctly, it can
          help detect early flaws in code which may be more difficult to find in
          later testing stages.
        </p>
      </div>
      <div className="p-5 border rounded-lg">
        <h1 className="text-2xl mb-5">
          How does prototypical inheritance work?
        </h1>
        <p>
          The Prototypal Inheritance is a feature in javascript used to add
          methods and properties in objects. It is a method by which an object
          can inherit the properties and methods of another object.
          Traditionally, in order to get and set the Prototype of an object, we
          use Object. getPrototypeOf and Object
        </p>
      </div>
      <div className="p-5 border rounded-lg">
        <h1 className="text-2xl mb-5">React vs. Angular vs. Vue?</h1>
        <p>
          <span className="font-bold">React:</span>React is a free and
          open-source front-end JavaScript library for building user interfaces
          based on UI components. It is maintained by Meta and a community of
          individual developers and companies. <br />
          <span className="font-bold">Angular:</span>Angular is a
          TypeScript-based free and open-source web application framework led by
          the Angular Team at Google and by a community of individuals and
          corporations. Angular is a complete rewrite from the same team that
          built AngularJS. <br />
          <span className="font-bold">Vue:</span>Vue.js is an open-source
          model–view–viewmodel front end JavaScript framework for building user
          interfaces and single-page applications. It was created by Evan You,
          and is maintained by him and the rest of the active core team members{" "}
          <br />
        </p>
      </div>
    </div>
  );
};

export default Blog;

import React from 'react';

const Blog = () => {
    return (
        <div>
            <h1 className="mt-5 mb-10 text-2xl font-semibold text-center text-red-700">Happy reading :) </h1>
            <div className="container m-10">
                {/*  question 1 */}
                <div className='p-2 my-2 border border-dashed border-blue-200'>
                    <h1 className="text-lg font-semibold">
                        <span className='text-red-800 font-bold'>Q : </span>
                        What are the different ways to manage a state in a React application?
                    </h1>
                    <p>
                        <span className='text-green-900 font-bold'>A : </span>
                        1 . useState <br />
                        2 . useReducer <br />
                        3 . useContext <br />
                        4 . useEffect <br />
                        5 . useHistory <br /> 6 . useLocation <br />7 . useRouter <br />8 . useParams <br />

                    </p>
                </div>

                {/*  question 2 */}
                <div className='p-2 my-2 border border-dashed border-blue-200'>
                    <h1 className="text-lg font-semibold">
                        <span className='text-red-800 font-bold'>Q : </span>
                        How does prototypical inheritance work?
                    </h1>
                    <p>
                        <span className='text-green-900 font-bold'>A : </span>
                        The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object. getPrototypeOf and Object.
                    </p>
                </div>

                {/*  question 3 */}
                <div className='p-2  my-2 border border-dashed border-blue-200'>
                    <h1 className="text-lg font-semibold">
                        <span className='text-red-800 font-bold'>Q : </span>
                        What is a unit test? Why should we write unit tests?
                    </h1>
                    <p>
                        <span className='text-green-900 font-bold'>A : </span>
                        Unit testing is a software development process in which the smallest testable parts of an application, called units, are individually and independently scrutinized for proper operation. This testing methodology is done during the development process by the software developers and sometimes QA staff.  The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages. Unit testing is a component of test-driven development (TDD), a pragmatic methodology that takes a meticulous approach to building a product by means of continual testing and revision. This testing method is also the first level of software testing, which is performed before other testing methods such as integration testing. Unit tests are typically isolated to ensure a unit does not rely on any external code or functions. Testing can be done manually but is often automated.
                    </p>
                </div>

                {/*  question 4 */}
                <div className='p-2 my-2 border border-dashed border-blue-200'>
                    <h1 className="text-lg font-semibold">
                        <span className='text-red-800 font-bold'>Q : </span>
                        React vs. Angular vs. Vue?
                    </h1>
                    <p>
                        <span className='text-green-900 font-bold'>A : </span>
                        Angular is a front-end framework with lots of components, services, and tools. On Angular’s site, you can see that they define Angular as: “The modern web developer’s platform” It is developed and maintained by Google developers, but curiously it is not used to implement any of their most common products such as Search or YouTube. React is considered a UI library. They define themselves as: “A JavaScript library for building user interfaces” Facebook developers are behind the development and maintenance of this library. And, in this case, most of Facebook’s products are made with React. Last but not least, Vue.js is, according to its site: “A progressive JavaScript framework” Vue.js is developed and led by Evan You, but also it counts on a huge open-source community. These three frameworks have several things in common, such as each follows a component-based architecture and allows creating UI features quickly. React and Vue.js are mainly declarative, and while Angular could also be declarative, it’s really more imperative. Nevertheless, they present some more differences according to their structure, architecture and way of working, so let’s dive into all these characteristics.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Blog;
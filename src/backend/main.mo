import Map "mo:core/Map";
import Set "mo:core/Set";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Float "mo:core/Float";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";

actor {
  type Tutorial = {
    id : Nat;
    title : Text;
    description : Text;
    category : Text;
    author : Text;
    duration : Text;
    viewCount : Nat;
    rating : Float;
    thumbnailUrl : Text;
    videoUrl : Text;
    tags : [Text];
    createdAt : Time.Time;
  };

  module Tutorial {
    public func compareByViewCount(t1 : Tutorial, t2 : Tutorial) : Order.Order {
      Nat.compare(t2.viewCount, t1.viewCount);
    };
  };

  let tutorialsMap = Map.empty<Nat, Tutorial>();

  func seedData() {
    let samples = [
      {
        id = 1;
        title = "JavaScript Fundamentals";
        description = "Learn the basics of JS: variables, functions, loops.";
        category = "JavaScript";
        author = "Alice Dev";
        duration = "22:15";
        viewCount = 1800;
        rating = 4.6;
        thumbnailUrl = "https://d3mixvzm9vuovv.cloudfront.net/thumbnails/javascript1.jpg";
        videoUrl = "https://videos.example.com/javascript1";
        tags = ["javascript", "basics", "web"];
        createdAt = Time.now();
      },
      {
        id = 2;
        title = "Python for Data Science";
        description = "Complete intro to Python through data science concepts.";
        category = "Python";
        author = "Bob AI";
        duration = "35:50";
        viewCount = 2400;
        rating = 4.8;
        thumbnailUrl = "https://d3mixvzm9vuovv.cloudfront.net/thumbnails/python1.jpg";
        videoUrl = "https://videos.example.com/python1";
        tags = ["python", "data science", "machine learning"];
        createdAt = Time.now();
      },
      {
        id = 3;
        title = "React Crash Course";
        description = "Build modern UIs with React and hooks.";
        category = "React";
        author = "Charlie Web";
        duration = "45:10";
        viewCount = 3000;
        rating = 4.7;
        thumbnailUrl = "https://d3mixvzm9vuovv.cloudfront.net/thumbnails/react1.jpg";
        videoUrl = "https://videos.example.com/react1";
        tags = ["react", "frontend", "javascript"];
        createdAt = Time.now();
      },
      {
        id = 4;
        title = "DevOps Essentials";
        description = "Introduction to CI/CD, Docker, Kubernetes";
        category = "DevOps";
        author = "Dana Infra";
        duration = "28:20";
        viewCount = 1200;
        rating = 4.5;
        thumbnailUrl = "https://d3mixvzm9vuovv.cloudfront.net/thumbnails/devops1.jpg";
        videoUrl = "https://videos.example.com/devops1";
        tags = ["devops", "docker", "kubernetes"];
        createdAt = Time.now();
      },
      {
        id = 5;
        title = "Machine Learning 101";
        description = "Understand ML concepts with Python examples.";
        category = "AI/ML";
        author = "Eve ML";
        duration = "31:35";
        viewCount = 950;
        rating = 4.9;
        thumbnailUrl = "https://d3mixvzm9vuovv.cloudfront.net/thumbnails/ml1.jpg";
        videoUrl = "https://videos.example.com/ml1";
        tags = ["machine learning", "python", "data"];
        createdAt = Time.now();
      },
      {
        id = 6;
        title = "Intro to TypeScript";
        description = "Strongly-typed Javascript with TypeScript fundamentals.";
        category = "JavaScript";
        author = "Frank Types";
        duration = "19:45";
        viewCount = 650;
        rating = 4.4;
        thumbnailUrl = "https://d3mixvzm9vuovv.cloudfront.net/thumbnails/typescript1.jpg";
        videoUrl = "https://videos.example.com/typescript1";
        tags = ["typescript", "javascript", "types"];
        createdAt = Time.now();
      },
      {
        id = 7;
        title = "Advanced CSS Grid Layouts";
        description = "Powerful web layouts with CSS grid techniques.";
        category = "Web Design";
        author = "Grace Styles";
        duration = "26:30";
        viewCount = 1150;
        rating = 4.7;
        thumbnailUrl = "https://d3mixvzm9vuovv.cloudfront.net/thumbnails/cssgrid1.jpg";
        videoUrl = "https://videos.example.com/cssgrid1";
        tags = ["css", "grid", "web design"];
        createdAt = Time.now();
      },
      {
        id = 8;
        title = "Django REST Framework";
        description = "Build robust APIs with Django REST framework.";
        category = "Python";
        author = "Helen Pythonista";
        duration = "37:54";
        viewCount = 890;
        rating = 4.3;
        thumbnailUrl = "https://d3mixvzm9vuovv.cloudfront.net/thumbnails/django1.jpg";
        videoUrl = "https://videos.example.com/django1";
        tags = ["django", "python", "api"];
        createdAt = Time.now();
      },
      {
        id = 9;
        title = "React Redux Crash Course";
        description = "State management in React with Redux.";
        category = "React";
        author = "Iris State";
        duration = "53:12";
        viewCount = 1620;
        rating = 4.9;
        thumbnailUrl = "https://d3mixvzm9vuovv.cloudfront.net/thumbnails/reactredux1.jpg";
        videoUrl = "https://videos.example.com/reactredux1";
        tags = ["react", "redux", "state management"];
        createdAt = Time.now();
      },
      {
        id = 10;
        title = "CI/CD with CircleCI";
        description = "Automate CI/CD pipelines using CircleCI and Docker.";
        category = "DevOps";
        author = "Jake Operations";
        duration = "23:40";
        viewCount = 720;
        rating = 4.4;
        thumbnailUrl = "https://d3mixvzm9vuovv.cloudfront.net/thumbnails/circleci1.jpg";
        videoUrl = "https://videos.example.com/circleci1";
        tags = ["ci/cd", "devops", "docker"];
        createdAt = Time.now();
      },
      {
        id = 11;
        title = "TensorFlow Deep Learning";
        description = "Train deep neural networks using TensorFlow.";
        category = "AI/ML";
        author = "Linda Neural";
        duration = "47:10";
        viewCount = 1350;
        rating = 4.8;
        thumbnailUrl = "https://d3mixvzm9vuovv.cloudfront.net/thumbnails/tensorflow1.jpg";
        videoUrl = "https://videos.example.com/tensorflow1";
        tags = ["tensorflow", "deep learning", "python"];
        createdAt = Time.now();
      },
    ];

    for (tutorial in samples.values()) {
      tutorialsMap.add(tutorial.id, tutorial);
    };
  };

  seedData();

  public query ({ caller }) func getAllTutorials() : async [Tutorial] {
    tutorialsMap.values().toArray();
  };

  public query ({ caller }) func getTutorialsByCategory(category : Text) : async [Tutorial] {
    tutorialsMap.values().toArray().filter(func(t) { t.category == category });
  };

  public query ({ caller }) func getTrendingTutorials() : async [Tutorial] {
    let sortedList = tutorialsMap.values().toArray().sort(Tutorial.compareByViewCount);

    let trendingList = Array.tabulate(4, func(i) { sortedList[i] });
    trendingList;
  };

  public query ({ caller }) func getCategories() : async [Text] {
    let categorySet = Set.empty<Text>();

    for (tutorial in tutorialsMap.values()) {
      categorySet.add(tutorial.category);
    };

    categorySet.toArray();
  };

  public shared ({ caller }) func incrementViewCount(id : Nat) : async () {
    let tutorial = switch (tutorialsMap.get(id)) {
      case (?t) { t };
      case (null) { Runtime.trap("Tutorial not found") };
    };

    let updatedTutorial = {
      tutorial with
      viewCount = tutorial.viewCount + 1;
    };

    tutorialsMap.add(id, updatedTutorial);
  };
};

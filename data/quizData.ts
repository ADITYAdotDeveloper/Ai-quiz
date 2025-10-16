
import type { QuizQuestion } from '../types';

const csvData = `Question,Option A,Option B,Option C,Option D,Answer
Which AI model is commonly used for detecting fabric defects from images?,Regression,CNN,Decision Tree,Naive Bayes,CNN
What type of data is used by AI for identifying color variations in fabric?,Audio,Image,Text,Numeric,Image
Which AI field enables machines to analyze textile patterns visually?,NLP,Computer Vision,Robotics,Data Mining,Computer Vision
AI robots performing automatic stitching in garment factories use which domain?,NLP,Robotics,Prediction,Vision,Robotics
Which AI algorithm can identify different fabric types through photos?,CNN,RNN,GAN,LSTM,CNN
Recommending the best clothing to online shoppers is an example of what AI system?,Chatbot,Recommendation,Regression,Optimization,Recommendation
Which AI method helps forecast future textile market trends?,Time Series,CNN,Clustering,Regression,Time Series
Fabric inspection systems detect tiny holes using which AI technique?,Object Detection,Speech Recognition,Clustering,Reinforcement,Object Detection
AI predicting cotton yield primarily relies on which data type?,Satellite,Text,Audio,Video,Satellite
Identifying surface texture of cloth is mainly done using which AI model?,CNN,LSTM,GAN,Decision Tree,CNN
Customer support bots helping users choose fabrics are based on which AI branch?,NLP,Vision,Robotics,Clustering,NLP
Predicting when textile machines may fail is an example of what AI use?,Predictive Maintenance,Sentiment Analysis,Image Generation,Classification,Predictive Maintenance
Grouping similar fabric samples automatically can be achieved using?,Clustering,Regression,CNN,LSTM,Clustering
Identifying fake clothing logos is possible with which AI field?,Image Recognition,Text Mining,Regression,Audio Detection,Image Recognition
AI creating new textile prints based on old ones uses which model?,GAN,RNN,CNN,Regression,GAN
Predicting future price of yarn is done using which AI technique?,Regression,Classification,Clustering,GAN,Regression
Suggesting optimal dye mixture ratios based on color data uses?,Regression,NLP,CNN,LSTM,Regression
Detecting defects in moving fabric video frames requires which model?,CNN,LSTM,GAN,RNN,LSTM
Adjusting loom machine speed based on fabric output quality uses?,Reinforcement,Supervised,Regression,NLP,Reinforcement
Smart fabric inspection robots depend on which AI area?,Robotics,NLP,Clustering,GAN,Robotics
Predicting how fabric will wrinkle after washing is done using?,Predictive,Regression,NLP,Reinforcement,Predictive
Automatically generating new textile patterns is a function of?,GAN,CNN,Regression,Decision Tree,GAN
Translating customer feedback about fabrics into English uses which AI?,NLP,Vision,Robotics,Classification,NLP
Dyeing machines that self-correct color tones use what AI mechanism?,Feedback,Clustering,Regression,Tokenization,Feedback
Predicting delivery delays in textile shipping is achieved using?,Forecasting,GAN,NLP,CNN,Forecasting
Detecting temperature inconsistency in dyeing units requires?,Sensor,Vision,NLP,Reinforcement,Sensor
Identifying counterfeit fabrics online uses which AI method?,Classification,Regression,GAN,LSTM,Classification
Predicting cloth tearing strength from production data uses?,Regression,NLP,Clustering,CNN,Regression
AI trained with both labeled and unlabeled textile data is called?,Supervised,Semi-supervised,Reinforcement,Unsupervised,Semi-supervised
Optimizing the cutting layout for fabric pieces can be done with?,Genetic,Regression,CNN,NLP,Genetic
Predicting yarn thickness variation relies on which AI model?,Regression,Clustering,GAN,CNN,Regression
Detecting fiber damage under microscope images uses?,Vision,NLP,GAN,Regression,Vision
Forecasting fabric demand using social media image posts uses?,Multimodal,NLP,Regression,CNN,Multimodal
Estimating body size from uploaded photos applies which AI area?,Vision,NLP,Regression,Reinforcement,Vision
Forecasting global cotton demand is best achieved using?,Economic,Market,Sensor,Audio,Market
Detecting unusual vibration in textile machinery uses which AI area?,Audio,Vision,NLP,Regression,Audio
Labeling fabric categories automatically in warehouse photos uses?,Classification,NLP,Regression,Reinforcement,Classification
Reducing energy usage in textile factories can be optimized using?,Reinforcement,Regression,CNN,Clustering,Reinforcement
Creating new design patterns based on old collections uses which AI?,GAN,RNN,Regression,CNN,GAN
Suggesting the best weaving method for a fabric type uses?,Expert,Regression,GAN,NLP,Expert
Detecting stains on fabrics using light-based imaging applies?,Vision,Audio,NLP,Regression,Vision
Predicting thread breakage during weaving uses?,Predictive,NLP,GAN,Regression,Predictive
Suggesting popular color combinations for new fashion lines uses?,Recommendation,Reinforcement,NLP,Regression,Recommendation
Predicting number of defects from machine log data uses?,Classification,Regression,Clustering,NLP,Classification
Identifying ethical and sustainable textile suppliers uses?,NLP,Vision,Regression,Reinforcement,NLP
Virtual try-on mirrors for customers are powered by which AI domain?,Vision,NLP,GAN,Regression,Vision
Detecting moisture damage in stored textiles uses?,Sensor,NLP,GAN,Reinforcement,Sensor
Simulating fabric movement digitally under airflow uses?,Simulation,Regression,GAN,NLP,Simulation
Optimizing textile production workflow with many AI agents is an example of?,Multiagent,Regression,GAN,NLP,Multiagent
A self-learning automated textile factory would rely on which AI type?,General,NLP,Regression,GAN,General`;

const parseCSV = (data: string): QuizQuestion[] => {
  const lines = data.trim().split('\n');
  const headers = lines[0].split(',');

  return lines.slice(1).map(line => {
    const values = line.split(',');
    return {
      question: values[0],
      options: [values[1], values[2], values[3], values[4]],
      answer: values[5]
    };
  });
};

const allQuestions = parseCSV(csvData);

export const getRandomQuestions = (numQuestions: number): QuizQuestion[] => {
  const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numQuestions);
};

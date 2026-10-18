// import React from 'react'
// import { Sparkles, ArrowRight } from 'lucide-react'

// const Neural = () => {
//   return (
//     <div className="min-h-screen bg-slate-950">
//       {/* Navigation */}
//       <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50">
//         <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
//               <Sparkles className="w-6 h-6 text-white" />
//             </div>
//             <span className="text-2xl font-bold text-cyan-400">NeuralEdge AI</span>
//           </div>
//         </div>
//       </nav>

//       <section className="min-h-screen flex items-center justify-center pt-20 px-6">
//         <div className="max-w-4xl text-center space-y-8">
//           <h1 className="text-6xl font-bold text-white">
//             Transform Your Business <br />
//             <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
//               With AI Intelligence
//             </span>
//           </h1>

//           <p className="text-xl text-slate-400">
//             We deliver cutting-edge artificial intelligence solutions
//           </p>

//           <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg text-white flex items-center gap-2 mx-auto">
//             Start Your AI Journey
//             <ArrowRight />
//           </button>
//         </div>
//       </section>
//     </div>
//   )
// }

// export default Neural



// /*import React from 'react'
// import { Sparkles, ArrowRight } from 'lucide-react'

// const NeuralEdgeAI = () => {
//   return (
//     <div className="min-h-screen bg-slate-950">
//       {/* کل کدی که فرستادی */}
     
//       {/* Navigation */}
//       <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50">
//         <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
//               <Sparkles className="w-6 h-6 text-white" />
//             </div>
//             <span className="text-2xl font-bold text-cyan-400">NeuralEdge AI</span>
//           </div>
          
//           <div className="flex items-center gap-8">
//             <a href="#services" className="text-slate-300 hover:text-white transition-colors">Services</a>
//             <a href="#about" className="text-slate-300 hover:text-white transition-colors">About</a>
//             <a href="#contact" className="text-slate-300 hover:text-white transition-colors">Contact</a>
//             <button className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
//               Get Started
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
//         {/* Background gradient effects */}
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
//           <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
//         </div>

//         <div className="relative max-w-5xl mx-auto text-center space-y-8">
//           {/* Badge */}
//           <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/50 border border-cyan-500/30 rounded-full text-sm text-slate-300">
//             <Sparkles className="w-4 h-4 text-cyan-400" />
//             <span>Powered by Advanced AI Technology</span>
//           </div>

//           {/* Main heading */}
//           <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
//             <div className="text-white">Transform Your Business</div>
//             <div className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
//               With AI Intelligence
//             </div>
//           </h1>

//           {/* Description */}
//           <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
//             We deliver cutting-edge artificial intelligence solutions that drive innovation,
//             enhance efficiency, and unlock unprecedented growth for your organization.
//           </p>

//           {/* CTA Buttons */}
//           <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
//             <button className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center gap-2">
//               Start Your AI Journey
//               <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//             </button>
//             <button className="px-8 py-4 bg-white text-slate-900 rounded-lg font-medium hover:bg-slate-100 transition-all">
//               View Case Studies
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Section 2 - AI Solutions */}
//       <section className="py-24 px-6 bg-slate-950">
//         <div className="max-w-7xl mx-auto">
//           {/* Section Header */}
//           <div className="text-center mb-16">
//             <h2 className="text-5xl font-bold text-white mb-4">Our AI Solutions</h2>
//             <p className="text-xl text-slate-400 max-w-3xl mx-auto">
//               Comprehensive artificial intelligence services tailored to your business needs
//             </p>
//           </div>

//           {/* Solutions Grid */}
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {/* Machine Learning */}
//             <div className="group bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300">
//               <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center mb-6">
//                 <Sparkles className="w-7 h-7 text-white" />
//               </div>
//               <h3 className="text-2xl font-bold text-white mb-3">Machine Learning</h3>
//               <p className="text-slate-400 mb-4 leading-relaxed">
//                 Custom ML models that learn from your data and adapt to your business processes for intelligent automation.
//               </p>
//               <a href="#" className="inline-flex items-center gap-2 text-cyan-400 hover:gap-3 transition-all">
//                 Learn more
//                 <ArrowRight className="w-4 h-4" />
//               </a>
//             </div>

//             {/* Natural Language Processing */}
//             <div className="group bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300">
//               <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mb-6">
//                 <Sparkles className="w-7 h-7 text-white" />
//               </div>
//               <h3 className="text-2xl font-bold text-white mb-3">Natural Language Processing</h3>
//               <p className="text-slate-400 mb-4 leading-relaxed">
//                 Advanced NLP solutions for sentiment analysis, chatbots, and intelligent document processing.
//               </p>
//               <a href="#" className="inline-flex items-center gap-2 text-cyan-400 hover:gap-3 transition-all">
//                 Learn more
//                 <ArrowRight className="w-4 h-4" />
//               </a>
//             </div>

//             {/* Computer Vision */}
//             <div className="group bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-pink-500/50 transition-all duration-300">
//               <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-pink-600 rounded-xl flex items-center justify-center mb-6">
//                 <Sparkles className="w-7 h-7 text-white" />
//               </div>
//               <h3 className="text-2xl font-bold text-white mb-3">Computer Vision</h3>
//               <p className="text-slate-400 mb-4 leading-relaxed">
//                 Image recognition, object detection, and visual AI systems for enhanced operational efficiency.
//               </p>
//               <a href="#" className="inline-flex items-center gap-2 text-cyan-400 hover:gap-3 transition-all">
//                 Learn more
//                 <ArrowRight className="w-4 h-4" />
//               </a>
//             </div>

//             {/* Predictive Analytics */}
//             <div className="group bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-red-500/50 transition-all duration-300">
//               <div className="w-14 h-14 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center mb-6">
//                 <Sparkles className="w-7 h-7 text-white" />
//               </div>
//               <h3 className="text-2xl font-bold text-white mb-3">Predictive Analytics</h3>
//               <p className="text-slate-400 mb-4 leading-relaxed">
//                 Data-driven forecasting and insights that help you make informed strategic decisions.
//               </p>
//               <a href="#" className="inline-flex items-center gap-2 text-cyan-400 hover:gap-3 transition-all">
//                 Learn more
//                 <ArrowRight className="w-4 h-4" />
//               </a>
//             </div>

//             {/* AI Consulting */}
//             <div className="group bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300">
//               <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-xl flex items-center justify-center mb-6">
//                 <Sparkles className="w-7 h-7 text-white" />
//               </div>
//               <h3 className="text-2xl font-bold text-white mb-3">AI Consulting</h3>
//               <p className="text-slate-400 mb-4 leading-relaxed">
//                 Strategic guidance on AI implementation, from proof of concept to full-scale deployment.
//               </p>
//               <a href="#" className="inline-flex items-center gap-2 text-cyan-400 hover:gap-3 transition-all">
//                 Learn more
//                 <ArrowRight className="w-4 h-4" />
//               </a>
//             </div>

//             {/* AI Integration */}
//             <div className="group bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300">
//               <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
//                 <Sparkles className="w-7 h-7 text-white" />
//               </div>
//               <h3 className="text-2xl font-bold text-white mb-3">AI Integration</h3>
//               <p className="text-slate-400 mb-4 leading-relaxed">
//                 Seamlessly integrate AI capabilities into your existing systems and workflows.
//               </p>
//               <a href="#" className="inline-flex items-center gap-2 text-cyan-400 hover:gap-3 transition-all">
//                 Learn more
//                 <ArrowRight className="w-4 h-4" />
//               </a>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Section 3 - Leading the AI Revolution */}
//       <section className="py-24 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid lg:grid-cols-2 gap-16 items-center">
//             {/* Left Content */}
//             <div>
//               <h2 className="text-5xl font-bold text-white mb-6">Leading the AI Revolution</h2>
//               <p className="text-xl text-slate-400 mb-8 leading-relaxed">
//                 We are a team of AI researchers, data scientists, and engineers passionate about building intelligent systems that solve real-world problems.
//               </p>

//               {/* Features List */}
//               <div className="space-y-4 mb-8">
//                 <div className="flex items-center gap-3">
//                   <div className="w-6 h-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
//                     <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                   </div>
//                   <span className="text-slate-300 text-lg">Cutting-edge research and development</span>
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <div className="w-6 h-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
//                     <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                   </div>
//                   <span className="text-slate-300 text-lg">Industry-leading AI expertise</span>
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <div className="w-6 h-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
//                     <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                   </div>
//                   <span className="text-slate-300 text-lg">Proven track record of success</span>
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <div className="w-6 h-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
//                     <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                   </div>
//                   <span className="text-slate-300 text-lg">End-to-end AI implementation</span>
//                 </div>
//               </div>

//               <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
//                 Learn About Our Team
//               </button>
//             </div>

//             {/* Right Stats Grid */}
//             <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8">
//               <div className="grid grid-cols-2 gap-6">
//                 {/* Years Experience */}
//                 <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-8 text-center">
//                   <div className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
//                     10+
//                   </div>
//                   <div className="text-slate-400">Years Experience</div>
//                 </div>

//                 {/* AI Projects */}
//                 <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-8 text-center">
//                   <div className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
//                     500+
//                   </div>
//                   <div className="text-slate-400">AI Projects</div>
//                 </div>

//                 {/* Team Members */}
//                 <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-8 text-center">
//                   <div className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
//                     50+
//                   </div>
//                   <div className="text-slate-400">Team Members</div>
//                 </div>

//                 {/* Countries */}
//                 <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-8 text-center">
//                   <div className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
//                     25+
//                   </div>
//                   <div className="text-slate-400">Countries</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Section 4 - Contact Form */}
//       <section className="py-24 px-6 bg-slate-950">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid lg:grid-cols-2 gap-16 items-start">
//             {/* Left Content */}
//             <div>
//               <h2 className="text-5xl font-bold text-white mb-6">Let's Build the Future Together</h2>
//               <p className="text-xl text-slate-400 mb-12 leading-relaxed">
//                 Ready to transform your business with AI? Get in touch with our team of experts.
//               </p>

//               {/* Contact Info */}
//               <div className="space-y-6">
//                 {/* Email */}
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 bg-slate-800/50 border border-slate-700/50 rounded-xl flex items-center justify-center flex-shrink-0">
//                     <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                     </svg>
//                   </div>
//                   <span className="text-slate-300 text-lg">contact@neuraledge.ai</span>
//                 </div>

//                 {/* Phone */}
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 bg-slate-800/50 border border-slate-700/50 rounded-xl flex items-center justify-center flex-shrink-0">
//                     <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                     </svg>
//                   </div>
//                   <span className="text-slate-300 text-lg">+1 (555) 123-4567</span>
//                 </div>

//                 {/* Location */}
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 bg-slate-800/50 border border-slate-700/50 rounded-xl flex items-center justify-center flex-shrink-0">
//                     <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                   </div>
//                   <span className="text-slate-300 text-lg">San Francisco, CA</span>
//                 </div>
//               </div>
//             </div>

//             {/* Right Contact Form */}
//             <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
//               <form className="space-y-6">
//                 {/* Name Field */}
//                 <div>
//                   <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
//                     Name
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     placeholder="Your name"
//                     className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
//                   />
//                 </div>

//                 {/* Email Field */}
//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     placeholder="your@email.com"
//                     className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
//                   />
//                 </div>

//                 {/* Message Field */}
//                 <div>
//                   <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
//                     Message
//                   </label>
//                   <textarea
//                     id="message"
//                     rows="6"
//                     placeholder="Tell us about your project..."
//                     className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
//                   ></textarea>
//                 </div>

//                 {/* Submit Button */}
//                 <button
//                   type="submit"
//                   className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
//                 >
//                   Send Message
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Placeholder for additional sections */}
//       {/* Section 5 will go here */}
//       {/* Footer will go here */}
//     </div>
//   );
// };

// export default NeuralEdgeAI;





//****************************

import { Sparkles, ArrowRight } from 'lucide-react'
const NeuralEdgeAI = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-cyan-400">NeuralEdge AI</span>
          </div>
          
          <div className="flex items-center gap-8">
            <button onClick={() => scrollToSection('services')} className="text-slate-300 hover:text-white transition-colors cursor-pointer">Services</button>
            <button onClick={() => scrollToSection('about')} className="text-slate-300 hover:text-white transition-colors cursor-pointer">About</button>
            <button onClick={() => scrollToSection('contact')} className="text-slate-300 hover:text-white transition-colors cursor-pointer">Contact</button>
            <button className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        {/* Background gradient effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-5xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/50 border border-cyan-500/30 rounded-full text-sm text-slate-300">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Powered by Advanced AI Technology</span>
          </div>

          {/* Main heading */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
            <div className="text-white">Transform Your Business</div>
            <div className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"  >
              With AI Intelligence
            </div>
          </h1>

          {/* Description */}
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            We deliver cutting-edge artificial intelligence solutions that drive innovation,
            enhance efficiency, and unlock unprecedented growth for your organization.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center gap-2">
              Start Your AI Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-white text-slate-900 rounded-lg font-medium hover:bg-slate-100 transition-all">
              View Case Studies
            </button>
          </div>
        </div>
      </section>

      {/* Section 2 - AI Solutions */}
      <section id="services" className="py-24 px-6 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-4">Our AI Solutions</h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Comprehensive artificial intelligence services tailored to your business needs
            </p>
          </div>

          {/* Solutions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Machine Learning */}
            <div className="group bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Machine Learning</h3>
              <p className="text-slate-400 mb-4 leading-relaxed">
                Custom ML models that learn from your data and adapt to your business processes for intelligent automation.
              </p>
              <a href="#" className="inline-flex items-center gap-2 text-cyan-400 hover:gap-3 transition-all">
                Learn more
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Natural Language Processing */}
            <div className="group bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Natural Language Processing</h3>
              <p className="text-slate-400 mb-4 leading-relaxed">
                Advanced NLP solutions for sentiment analysis, chatbots, and intelligent document processing.
              </p>
              <a href="#" className="inline-flex items-center gap-2 text-cyan-400 hover:gap-3 transition-all">
                Learn more
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Computer Vision */}
            <div className="group bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-pink-500/50 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Computer Vision</h3>
              <p className="text-slate-400 mb-4 leading-relaxed">
                Image recognition, object detection, and visual AI systems for enhanced operational efficiency.
              </p>
              <a href="#" className="inline-flex items-center gap-2 text-cyan-400 hover:gap-3 transition-all">
                Learn more
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Predictive Analytics */}
            <div className="group bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-red-500/50 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Predictive Analytics</h3>
              <p className="text-slate-400 mb-4 leading-relaxed">
                Data-driven forecasting and insights that help you make informed strategic decisions.
              </p>
              <a href="#" className="inline-flex items-center gap-2 text-cyan-400 hover:gap-3 transition-all">
                Learn more
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* AI Consulting */}
            <div className="group bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">AI Consulting</h3>
              <p className="text-slate-400 mb-4 leading-relaxed">
                Strategic guidance on AI implementation, from proof of concept to full-scale deployment.
              </p>
              <a href="#" className="inline-flex items-center gap-2 text-cyan-400 hover:gap-3 transition-all">
                Learn more
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* AI Integration */}
            <div className="group bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">AI Integration</h3>
              <p className="text-slate-400 mb-4 leading-relaxed">
                Seamlessly integrate AI capabilities into your existing systems and workflows.
              </p>
              <a href="#" className="inline-flex items-center gap-2 text-cyan-400 hover:gap-3 transition-all">
                Learn more
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 - Leading the AI Revolution */}
      <section id="about" className="py-24 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <h2 className="text-5xl font-bold text-white mb-6">Leading the AI Revolution</h2>
              <p className="text-xl text-slate-400 mb-8 leading-relaxed">
                We are a team of AI researchers, data scientists, and engineers passionate about building intelligent systems that solve real-world problems.
              </p>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-slate-300 text-lg">Cutting-edge research and development</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-slate-300 text-lg">Industry-leading AI expertise</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-slate-300 text-lg">Proven track record of success</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-slate-300 text-lg">End-to-end AI implementation</span>
                </div>
              </div>

              <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
                Learn About Our Team
              </button>
            </div>

            {/* Right Stats Grid */}
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8">
              <div className="grid grid-cols-2 gap-6">
                {/* Years Experience */}
                <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-8 text-center">
                  <div className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                    10+
                  </div>
                  <div className="text-slate-400">Years Experience</div>
                </div>

                {/* AI Projects */}
                <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-8 text-center">
                  <div className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                    500+
                  </div>
                  <div className="text-slate-400">AI Projects</div>
                </div>

                {/* Team Members */}
                <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-8 text-center">
                  <div className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                    50+
                  </div>
                  <div className="text-slate-400">Team Members</div>
                </div>

                {/* Countries */}
                <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-8 text-center">
                  <div className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                    25+
                  </div>
                  <div className="text-slate-400">Countries</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 - Contact Form */}
      <section id="contact" className="py-24 px-6 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Content */}
            <div>
              <h2 className="text-5xl font-bold text-white mb-6">Let's Build the Future Together</h2>
              <p className="text-xl text-slate-400 mb-12 leading-relaxed">
                Ready to transform your business with AI? Get in touch with our team of experts.
              </p>

              {/* Contact Info */}
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-800/50 border border-slate-700/50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-slate-300 text-lg">contact@neuraledge.ai</span>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-800/50 border border-slate-700/50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span className="text-slate-300 text-lg">+1 (555) 123-4567</span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-800/50 border border-slate-700/50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="text-slate-300 text-lg">San Francisco, CA</span>
                </div>
              </div>
            </div>

            {/* Right Contact Form */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
              <form className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="6"
                    placeholder="Tell us about your project..."
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Placeholder for additional sections */}
      {/* Section 5 will go here */}
      {/* Footer will go here */}
    </div>
  );
};
export default NeuralEdgeAI;


















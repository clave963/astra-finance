import React, { useState } from 'react';
import { Brain, DollarSign, Target, Settings, Bell, Search, Sparkles, TrendingUp, Calendar, Zap, CheckCircle, Plus, Edit2, Trash2, ArrowRight, Home, Plane, GraduationCap, Heart, Wallet, Trophy, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const GoalsPage = () => {
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [showSurvey, setShowSurvey] = useState(true); // Show survey on first visit
  const [surveyStep, setSurveyStep] = useState(0);
  const [surveyData, setSurveyData] = useState({
    monthlyIncome: '',
    monthlyExpenses: '',
    currentSavings: '',
    biggestStress: '',
    primaryGoal: '',
    timeline: '',
    riskTolerance: ''
  });

  const surveyQuestions = [
    {
      id: 'monthlyIncome',
      question: 'What is your monthly take-home income?',
      type: 'currency',
      placeholder: '5,000',
      hint: 'After taxes and deductions'
    },
    {
      id: 'monthlyExpenses',
      question: 'What are your typical monthly expenses?',
      type: 'currency',
      placeholder: '3,500',
      hint: 'Include rent, bills, food, transportation'
    },
    {
      id: 'currentSavings',
      question: 'How much do you currently have saved?',
      type: 'currency',
      placeholder: '2,000',
      hint: 'Total across all savings accounts'
    },
    {
      id: 'biggestStress',
      question: 'What is your biggest financial stress right now?',
      type: 'select',
      options: [
        'Living paycheck to paycheck',
        'Not having an emergency fund',
        'Credit card debt',
        'Student loan debt',
        'Saving for a major purchase',
        'Planning for retirement',
        'Other'
      ]
    },
    {
      id: 'primaryGoal',
      question: 'What is your primary financial goal?',
      type: 'select',
      options: [
        'Build an emergency fund',
        'Pay off debt',
        'Save for a home',
        'Plan a vacation',
        'Start investing',
        'Save for education',
        'Retirement planning'
      ]
    },
    {
      id: 'timeline',
      question: 'When do you hope to achieve your primary goal?',
      type: 'select',
      options: [
        'Within 6 months',
        '6-12 months',
        '1-2 years',
        '2-5 years',
        '5+ years'
      ]
    },
    {
      id: 'riskTolerance',
      question: 'How would you describe your approach to saving?',
      type: 'select',
      options: [
        'Conservative - I want guaranteed returns',
        'Moderate - Balance of safety and growth',
        'Aggressive - I can handle risk for higher returns'
      ]
    }
  ];

  const handleSurveyInput = (field, value) => {
    setSurveyData({ ...surveyData, [field]: value });
  };

  const handleSurveyNext = () => {
    if (surveyStep < surveyQuestions.length - 1) {
      setSurveyStep(surveyStep + 1);
    } else {
      // Survey complete - process with AI
      completeSurvey();
    }
  };

  const handleSurveyBack = () => {
    if (surveyStep > 0) {
      setSurveyStep(surveyStep - 1);
    }
  };

  const completeSurvey = () => {
    // Here you would send survey data to your AI backend
    // For now, we'll just close the modal
    setShowSurvey(false);
    // AI would analyze responses and auto-generate recommended goals
  };

  const currentQuestion = surveyQuestions[surveyStep];
  const progress = ((surveyStep + 1) / surveyQuestions.length) * 100;

  // Active financial goals
  const activeGoals = [
    {
      id: 1,
      name: 'Emergency Fund',
      icon: Wallet,
      color: '#6366F1',
      current: 2800,
      target: 6000,
      monthlyContribution: 350,
      timeline: '8 months',
      priority: 'high',
      onTrack: true,
      milestones: [
        { amount: 1500, label: '1 month expenses', completed: true },
        { amount: 3000, label: '2 months expenses', completed: false },
        { amount: 4500, label: '3 months expenses', completed: false },
        { amount: 6000, label: '4 months expenses', completed: false }
      ],
      aiSuggestion: 'Increase monthly contribution by $50 to reach your goal 2 months early',
      nextMilestone: 3000,
      actionPlan: [
        { step: 'Set up automatic transfer of $350 on payday', completed: true },
        { step: 'Review and reduce dining out budget by $100', completed: true },
        { step: 'Sell unused items online for extra savings', completed: false },
        { step: 'Apply any work bonuses directly to this fund', completed: false }
      ]
    },
    {
      id: 2,
      name: 'Vacation Fund',
      icon: Plane,
      color: '#8B5CF6',
      current: 750,
      target: 2500,
      monthlyContribution: 250,
      timeline: '6 months',
      priority: 'medium',
      onTrack: true,
      milestones: [
        { amount: 625, label: 'Flights booked', completed: true },
        { amount: 1250, label: 'Hotel deposit', completed: false },
        { amount: 1875, label: 'Activities budget', completed: false },
        { amount: 2500, label: 'Full trip funded', completed: false }
      ],
      aiSuggestion: 'Book flights now to lock in current prices and save $200',
      nextMilestone: 1250,
      actionPlan: [
        { step: 'Research and compare flight prices', completed: true },
        { step: 'Set travel alerts for price drops', completed: true },
        { step: 'Create detailed trip budget', completed: false },
        { step: 'Book accommodation 3 months out', completed: false }
      ]
    },
    {
      id: 3,
      name: 'Home Down Payment',
      icon: Home,
      color: '#A855F7',
      current: 8200,
      target: 25000,
      monthlyContribution: 800,
      timeline: '18 months',
      priority: 'high',
      onTrack: false,
      milestones: [
        { amount: 6250, label: '25% saved', completed: true },
        { amount: 12500, label: '50% saved', completed: false },
        { amount: 18750, label: '75% saved', completed: false },
        { amount: 25000, label: 'Goal reached', completed: false }
      ],
      aiSuggestion: 'Consider high-yield savings account to earn $380 more in interest',
      nextMilestone: 12500,
      actionPlan: [
        { step: 'Open high-yield savings account', completed: false },
        { step: 'Research first-time homebuyer programs', completed: false },
        { step: 'Meet with mortgage pre-approval advisor', completed: false },
        { step: 'Increase income with side project', completed: false }
      ]
    }
  ];

  // Suggested goal templates
  const goalTemplates = [
    { name: 'Emergency Fund', icon: Wallet, typical: 6000, description: '3-6 months of expenses' },
    { name: 'Vacation', icon: Plane, typical: 3000, description: 'International trip fund' },
    { name: 'Home Down Payment', icon: Home, typical: 25000, description: '10-20% of home price' },
    { name: 'Education', icon: GraduationCap, typical: 10000, description: 'Courses or degree program' },
    { name: 'Wedding', icon: Heart, typical: 15000, description: 'Ceremony and reception' },
    { name: 'New Car', icon: Target, typical: 8000, description: 'Down payment fund' }
  ];

  const calculateProgress = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  const calculateMonthsRemaining = (current, target, monthly) => {
    const remaining = target - current;
    return Math.ceil(remaining / monthly);
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Proxima Nova, system-ui, sans-serif' }}>
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-200/80 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-12">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-3xl bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center shadow-lg">
                    <Brain className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute inset-0 w-12 h-12 rounded-3xl bg-purple-600 animate-pulse opacity-20" />
                </div>
                <div>
                  <h1 className="text-2xl font-light text-gray-900 tracking-tight">Astra</h1>
                  <p className="text-xs text-gray-500 tracking-wider uppercase font-medium">AI Personal Finance Coach</p>
                </div>
              </div>
              
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                <input
                  type="text"
                  placeholder="Search goals, milestones..."
                  className="pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:bg-white focus:ring-4 focus:ring-purple-100 transition-all duration-200 w-80"
                />
              </div>
              
              <nav className="flex space-x-1">
                {['Overview', 'Spending', 'Goals', 'Insights'].map((tab) => (
                  <Link
                    key={tab}
                    to={tab === 'Overview' ? '/' : `/${tab.toLowerCase()}`}
                    className={`px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 rounded-2xl ${
                      tab === 'Goals'
                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-200'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {tab}
                  </Link>
                ))}
              </nav>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-2xl transition-all duration-200">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-2xl transition-all duration-200">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Financial Health Assessment Modal */}
        {showSurvey && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
              {/* Modal Header */}
              <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-8 text-white">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                    <Brain className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold">Financial Health Assessment</h2>
                    <p className="text-purple-100">Help Astra personalize your financial plan</p>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-white/20 rounded-full h-2 mt-6">
                  <div 
                    className="bg-white h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-sm text-purple-100">
                  <span>Question {surveyStep + 1} of {surveyQuestions.length}</span>
                  <span>{Math.round(progress)}% complete</span>
                </div>
              </div>

              {/* Question Content */}
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                  {currentQuestion.question}
                </h3>

                {currentQuestion.type === 'currency' && (
                  <div>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">$</span>
                      <input
                        type="text"
                        placeholder={currentQuestion.placeholder}
                        value={surveyData[currentQuestion.id]}
                        onChange={(e) => handleSurveyInput(currentQuestion.id, e.target.value)}
                        className="w-full pl-10 pr-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all"
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-2">{currentQuestion.hint}</p>
                  </div>
                )}

                {currentQuestion.type === 'select' && (
                  <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleSurveyInput(currentQuestion.id, option)}
                        className={`w-full p-4 text-left rounded-2xl border-2 transition-all ${
                          surveyData[currentQuestion.id] === option
                            ? 'border-purple-600 bg-purple-50 text-purple-900'
                            : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{option}</span>
                          {surveyData[currentQuestion.id] === option && (
                            <CheckCircle className="w-5 h-5 text-purple-600" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="border-t border-gray-200 p-6 flex items-center justify-between bg-gray-50">
                <button
                  onClick={() => setShowSurvey(false)}
                  className="text-gray-600 hover:text-gray-900 font-medium"
                >
                  Skip for now
                </button>
                <div className="flex items-center space-x-3">
                  {surveyStep > 0 && (
                    <button
                      onClick={handleSurveyBack}
                      className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                    >
                      Back
                    </button>
                  )}
                  <button
                    onClick={handleSurveyNext}
                    disabled={!surveyData[currentQuestion.id]}
                    className={`px-6 py-3 rounded-xl font-semibold transition-colors flex items-center space-x-2 ${
                      surveyData[currentQuestion.id]
                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <span>{surveyStep === surveyQuestions.length - 1 ? 'Complete Assessment' : 'Next'}</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Assessment Incomplete Banner (for users who skipped) */}
        {!showSurvey && false && ( // Change 'false' to a state variable for users who haven't completed
          <div className="mb-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Complete Your Financial Health Assessment</h3>
                  <p className="text-purple-100">Help Astra create personalized goals and recommendations (3 minutes)</p>
                </div>
              </div>
              <button 
                onClick={() => setShowSurvey(true)}
                className="px-6 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-colors"
              >
                Start Assessment
              </button>
            </div>
          </div>
        )}
        {/* Page Header */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-light text-gray-900 mb-3 tracking-tight">Financial Goals</h1>
            <p className="text-xl text-gray-600">Track your progress and stay motivated with AI-powered guidance</p>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => {
                setSurveyStep(0);
                setShowSurvey(true);
              }}
              className="px-6 py-3 bg-white border-2 border-purple-600 text-purple-600 rounded-2xl text-sm font-semibold hover:bg-purple-50 transition-colors flex items-center space-x-2"
            >
              <Brain className="w-5 h-5" />
              <span>Retake Assessment</span>
            </button>
            <button 
              onClick={() => setShowAddGoal(!showAddGoal)}
              className="px-6 py-3 bg-purple-600 text-white rounded-2xl text-sm font-semibold hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200 flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add New Goal</span>
            </button>
          </div>
        </div>

        {/* Overall Progress Summary */}
        <div className="mb-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-3xl p-8 text-white shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Overall Progress</h2>
                <p className="text-purple-100">You're on track with 2 of 3 goals</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-light mb-1">$11,750</div>
              <div className="text-purple-100">Total saved across all goals</div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-3xl font-light mb-2">$1,400</div>
              <div className="text-purple-100">Monthly contributions</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-3xl font-light mb-2">35%</div>
              <div className="text-purple-100">Average completion</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-3xl font-light mb-2">11</div>
              <div className="text-purple-100">Months to complete all</div>
            </div>
          </div>
        </div>

        {/* Active Goals */}
        <div className="mb-10">
          <h2 className="text-2xl font-light text-gray-900 mb-6">Active Goals</h2>
          <div className="space-y-6">
            {activeGoals.map((goal) => {
              const Icon = goal.icon;
              const progress = calculateProgress(goal.current, goal.target);
              const monthsLeft = calculateMonthsRemaining(goal.current, goal.target, goal.monthlyContribution);
              
              return (
                <div 
                  key={goal.id}
                  className="bg-white border border-gray-200/80 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
                  onClick={() => setSelectedGoal(selectedGoal === goal.id ? null : goal.id)}
                >
                  {/* Goal Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div 
                        className="p-4 rounded-2xl"
                        style={{ backgroundColor: `${goal.color}20` }}
                      >
                        <Icon className="w-8 h-8" style={{ color: goal.color }} />
                      </div>
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-2xl font-semibold text-gray-900">{goal.name}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            goal.priority === 'high' 
                              ? 'bg-red-100 text-red-700' 
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {goal.priority} priority
                          </span>
                          {goal.onTrack ? (
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 flex items-center space-x-1">
                              <CheckCircle className="w-3 h-3" />
                              <span>On Track</span>
                            </span>
                          ) : (
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700 flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>Needs Attention</span>
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600">
                          ${goal.current.toLocaleString()} of ${goal.target.toLocaleString()} saved • {monthsLeft} months remaining
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-colors">
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-700">Progress</span>
                      <span className="text-sm font-semibold text-gray-900">{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-4">
                      <div 
                        className="h-4 rounded-full transition-all duration-1000 ease-out shadow-sm"
                        style={{ 
                          width: `${progress}%`,
                          background: `linear-gradient(90deg, ${goal.color}, ${goal.color}dd)`
                        }}
                      />
                    </div>
                  </div>

                  {/* AI Suggestion */}
                  <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-2xl">
                    <div className="flex items-start space-x-3">
                      <Sparkles className="w-5 h-5 text-purple-600 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-purple-900 mb-1">AI Suggestion</h4>
                        <p className="text-sm text-purple-800">{goal.aiSuggestion}</p>
                      </div>
                      <button className="px-4 py-2 bg-purple-600 text-white text-xs font-semibold rounded-xl hover:bg-purple-700 transition-colors">
                        Apply
                      </button>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {selectedGoal === goal.id && (
                    <div className="pt-6 border-t border-gray-200 space-y-6">
                      {/* Milestones */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Milestones</h4>
                        <div className="grid grid-cols-2 gap-4">
                          {goal.milestones.map((milestone, index) => (
                            <div 
                              key={index}
                              className={`p-4 rounded-2xl border ${
                                milestone.completed 
                                  ? 'bg-emerald-50 border-emerald-200' 
                                  : 'bg-gray-50 border-gray-200'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-mono text-lg font-semibold text-gray-900">
                                  ${milestone.amount.toLocaleString()}
                                </span>
                                {milestone.completed && (
                                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                                )}
                              </div>
                              <p className="text-sm text-gray-600">{milestone.label}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Plan */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Action Plan</h4>
                        <div className="space-y-3">
                          {goal.actionPlan.map((action, index) => (
                            <div 
                              key={index}
                              className="flex items-center space-x-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors"
                            >
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                action.completed ? 'bg-emerald-500' : 'bg-gray-300'
                              }`}>
                                {action.completed && <CheckCircle className="w-4 h-4 text-white" />}
                              </div>
                              <span className={`flex-1 ${
                                action.completed ? 'text-gray-500 line-through' : 'text-gray-900'
                              }`}>
                                {action.step}
                              </span>
                              {!action.completed && (
                                <button className="text-sm text-purple-600 hover:text-purple-700 font-semibold">
                                  Mark Complete
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Contribution Settings */}
                      <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl border border-purple-200">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Monthly Contribution</h4>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-3xl font-light text-gray-900 mb-1">
                              ${goal.monthlyContribution}
                            </div>
                            <p className="text-sm text-gray-600">Automatic transfer on the 1st of each month</p>
                          </div>
                          <button className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors">
                            Adjust Amount
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Expand/Collapse Indicator */}
                  <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-center">
                    <button className="text-sm text-gray-500 hover:text-purple-600 font-medium flex items-center space-x-2">
                      <span>{selectedGoal === goal.id ? 'Show Less' : 'Show More Details'}</span>
                      <ArrowRight className={`w-4 h-4 transition-transform ${selectedGoal === goal.id ? 'rotate-90' : ''}`} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Goal Templates */}
        {showAddGoal && (
          <div className="mb-10 bg-white border border-gray-200/80 rounded-3xl p-8 shadow-sm">
            <h2 className="text-2xl font-light text-gray-900 mb-6">Start a New Goal</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {goalTemplates.map((template, index) => {
                const Icon = template.icon;
                return (
                  <button
                    key={index}
                    className="p-6 rounded-2xl border-2 border-gray-200 hover:border-purple-400 hover:bg-purple-50 transition-all text-left group"
                  >
                    <Icon className="w-10 h-10 text-purple-600 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                    <div className="text-sm text-purple-600 font-semibold">
                      Typical goal: ${template.typical.toLocaleString()}
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <button className="text-purple-600 hover:text-purple-700 font-semibold flex items-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>Create Custom Goal</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default GoalsPage;
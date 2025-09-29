import React, { useState } from 'react';
import { Brain, Settings, Bell, Search, Sparkles, TrendingUp, TrendingDown, AlertCircle, Calendar, DollarSign, PieChart, BarChart3, Clock, Info, ChevronDown, ChevronUp, Zap, Shield, Eye, Target, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const InsightsPage = () => {
  const [activeTab, setActiveTab] = useState('insights');
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  // Monthly spending trend data
  const spendingTrendData = [
    { month: 'Jan', spending: 2400, income: 3200, projected: 2450 },
    { month: 'Feb', spending: 2200, income: 3200, projected: 2350 },
    { month: 'Mar', spending: 2600, income: 3200, projected: 2550 },
    { month: 'Apr', spending: 2100, income: 3200, projected: 2400 },
    { month: 'May', spending: 2300, income: 3200, projected: 2450 },
    { month: 'Jun', spending: 2500, income: 3200, projected: 2500 }
  ];

  // Category spending patterns
  const categoryPatterns = [
    { category: 'Groceries', avgSpend: 420, trend: 'stable', insight: 'Consistent weekly shopping pattern', confidence: 94 },
    { category: 'Dining Out', avgSpend: 180, trend: 'increasing', insight: 'Spending increases on weekends by 60%', confidence: 89 },
    { category: 'Transportation', avgSpend: 250, trend: 'decreasing', insight: 'Remote work days reducing commute costs', confidence: 92 },
    { category: 'Coffee & Cafes', avgSpend: 85, trend: 'increasing', insight: 'Daily coffee habit costing $45 more this month', confidence: 96 }
  ];

  // AI-generated insights
  const aiInsights = [
    {
      type: 'spending_pattern',
      title: 'Weekend Spending Spike Detected',
      description: 'You spend 62% more on dining and entertainment during weekends. Your Saturday spending averages $85 vs $32 on weekdays.',
      impact: 'high',
      recommendation: 'Setting a weekend budget of $150 could save you $280/month toward your vacation fund.',
      confidence: 91,
      icon: Calendar
    },
    {
      type: 'savings_opportunity',
      title: 'Subscription Optimization Available',
      description: 'Analysis of your recurring charges shows 3 overlapping streaming services. You\'re paying $47/month for duplicate content.',
      impact: 'medium',
      recommendation: 'Cancel Netflix or Hulu (keeping both provides only 15% unique content) to save $564 annually.',
      confidence: 88,
      icon: DollarSign
    },
    {
      type: 'behavioral',
      title: 'Emotional Spending Pattern',
      description: 'Your transaction data shows increased spending on retail therapy after stressful work weeks (identifiable by email volume spikes).',
      impact: 'medium',
      recommendation: 'Try the 24-hour rule: wait a day before non-essential purchases over $50.',
      confidence: 76,
      icon: AlertCircle
    },
    {
      type: 'forecast',
      title: 'Cash Flow Projection: Positive',
      description: 'Based on your current spending trajectory and income stability, you\'re on track to save $850 this month.',
      impact: 'positive',
      recommendation: 'Your emergency fund goal is 2 months ahead of schedule. Consider increasing vacation fund contribution.',
      confidence: 93,
      icon: TrendingUp
    }
  ];

  // Benchmarking data
  const benchmarkData = {
    yourSavingsRate: 28,
    similarUsersSavingsRate: 22,
    yourGrocerySpend: 420,
    similarUsersGrocerySpend: 485,
    yourDiningSpend: 180,
    similarUsersDiningSpend: 245
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xl">
          <p className="font-semibold text-gray-900 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between space-x-6">
              <span className="text-gray-600 text-sm capitalize">{entry.dataKey}</span>
              <span className="font-mono text-sm font-semibold text-gray-900">
                ${entry.value?.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
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
                  <p className="text-xs text-gray-500 tracking-wider uppercase font-medium whitespace-nowrap">AI Personal Finance Coach</p>
                </div>
              </div>
              
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                <input
                  type="text"
                  placeholder="Search insights, patterns..."
                  className="pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:bg-white focus:ring-4 focus:ring-purple-100 transition-all duration-200 w-80"
                />
              </div>
              
              <nav className="flex space-x-1">
                {['Overview', 'Spending', 'Goals', 'Insights'].map((tab) => (
                  <Link
                    key={tab}
                    to={tab === 'Overview' ? '/' : `/${tab.toLowerCase()}`}
                    className={`px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 rounded-2xl ${
                      tab === 'Insights'
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
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-light text-gray-900 mb-3 tracking-tight">AI-Powered Insights</h1>
          <p className="text-xl text-gray-600">Understand your financial behavior with intelligent pattern analysis</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-10 flex items-center space-x-4">
          <button
            onClick={() => setActiveTab('insights')}
            className={`px-6 py-3 rounded-2xl text-sm font-semibold transition-all ${
              activeTab === 'insights'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-200'
                : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200'
            }`}
          >
            Your Insights
          </button>
          <button
            onClick={() => setActiveTab('how-it-works')}
            className={`px-6 py-3 rounded-2xl text-sm font-semibold transition-all ${
              activeTab === 'how-it-works'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-200'
                : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200'
            }`}
          >
            How Astra Works
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-6 py-3 rounded-2xl text-sm font-semibold transition-all ${
              activeTab === 'privacy'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-200'
                : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200'
            }`}
          >
            Privacy & Data
          </button>
        </div>

        {/* Your Insights Tab */}
        {activeTab === 'insights' && (
          <div className="space-y-10">
            {/* Monthly Financial Report */}
            <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-3xl p-8 text-white shadow-xl">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <Sparkles className="w-8 h-8" />
                    <h2 className="text-2xl font-semibold">Monthly Financial Report</h2>
                  </div>
                  <p className="text-purple-100">AI-generated summary for June 2024</p>
                </div>
                <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-semibold backdrop-blur-sm">
                  93% Confidence
                </span>
              </div>

              <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm mb-6">
                <p className="text-lg leading-relaxed">
                  You're doing great this month! Your spending is <strong>15% under budget</strong>, and you're on track to save <strong>$850</strong>. 
                  The biggest improvement came from reducing dining expenses by <strong>$120</strong>. However, weekend spending remains 
                  your biggest challenge—you spent <strong>62% more</strong> on Saturdays. Focus on setting a weekend budget to maximize savings toward your vacation fund.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="text-3xl font-light mb-2">$850</div>
                  <div className="text-purple-100">Projected savings</div>
                </div>
                <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="text-3xl font-light mb-2">28%</div>
                  <div className="text-purple-100">Savings rate</div>
                </div>
                <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="text-3xl font-light mb-2">A-</div>
                  <div className="text-purple-100">Financial health grade</div>
                </div>
              </div>
            </div>

            {/* Spending Forecast */}
            <div className="bg-white border border-gray-200/80 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-light text-gray-900 mb-2">6-Month Spending Forecast</h3>
                  <p className="text-gray-600">AI prediction based on historical patterns</p>
                </div>
                <button className="p-2 text-gray-400 hover:text-purple-600 rounded-xl hover:bg-purple-50 transition-colors">
                  <Info className="w-5 h-5" />
                </button>
              </div>

              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={spendingTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="spendingGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                      <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.05}/>
                    </linearGradient>
                    <linearGradient id="projectedGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#EC4899" stopOpacity={0.3}/>
                      <stop offset="100%" stopColor="#EC4899" stopOpacity={0.05}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                  <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
                  <YAxis stroke="#9CA3AF" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="spending" stroke="#8B5CF6" fill="url(#spendingGrad)" strokeWidth={2} />
                  <Area type="monotone" dataKey="projected" stroke="#EC4899" fill="url(#projectedGrad)" strokeWidth={2} strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>

              <div className="flex items-center justify-center mt-6 space-x-10">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full bg-purple-500" />
                  <span className="text-gray-600 font-medium">Actual Spending</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full bg-pink-500" />
                  <span className="text-gray-600 font-medium">AI Projection</span>
                </div>
              </div>
            </div>

            {/* AI Insights Cards */}
            <div>
              <h3 className="text-2xl font-light text-gray-900 mb-6">Personalized Insights</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {aiInsights.map((insight, index) => {
                  const Icon = insight.icon;
                  return (
                    <div key={index} className="bg-white border border-gray-200/80 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-500">
                      <div className="flex items-start space-x-4 mb-4">
                        <div className={`p-3 rounded-2xl ${
                          insight.impact === 'high' ? 'bg-red-50' :
                          insight.impact === 'medium' ? 'bg-orange-50' :
                          'bg-emerald-50'
                        }`}>
                          <Icon className={`w-6 h-6 ${
                            insight.impact === 'high' ? 'text-red-600' :
                            insight.impact === 'medium' ? 'text-orange-600' :
                            'text-emerald-600'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-lg font-semibold text-gray-900">{insight.title}</h4>
                            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                              {insight.confidence}% confident
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-4">{insight.description}</p>
                          <div className="p-4 bg-purple-50 border border-purple-200 rounded-2xl">
                            <div className="flex items-start space-x-2">
                              <Zap className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                              <p className="text-sm text-purple-900"><strong>Recommendation:</strong> {insight.recommendation}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Category Analysis */}
            <div className="bg-white border border-gray-200/80 rounded-3xl p-8 shadow-sm">
              <h3 className="text-2xl font-light text-gray-900 mb-6">Category Pattern Analysis</h3>
              <div className="space-y-4">
                {categoryPatterns.map((pattern, index) => (
                  <div key={index} className="p-6 rounded-2xl border border-gray-100 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">{pattern.category}</h4>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            pattern.trend === 'increasing' ? 'bg-red-100 text-red-700' :
                            pattern.trend === 'decreasing' ? 'bg-emerald-100 text-emerald-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {pattern.trend === 'increasing' ? <TrendingUp className="w-3 h-3 inline mr-1" /> :
                             pattern.trend === 'decreasing' ? <TrendingDown className="w-3 h-3 inline mr-1" /> : null}
                            {pattern.trend}
                          </span>
                          <span className="text-sm text-gray-500">{pattern.confidence}% confidence</span>
                        </div>
                        <p className="text-sm text-gray-600">{pattern.insight}</p>
                      </div>
                      <div className="text-right ml-6">
                        <div className="text-2xl font-semibold text-gray-900">${pattern.avgSpend}</div>
                        <div className="text-sm text-gray-500">avg/month</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Benchmarking */}
            <div className="bg-white border border-gray-200/80 rounded-3xl p-8 shadow-sm">
              <h3 className="text-2xl font-light text-gray-900 mb-6">How You Compare</h3>
              <p className="text-gray-600 mb-6">Anonymized comparison to users with similar income and location</p>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-gray-900">Savings Rate</span>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-600">You: <strong>{benchmarkData.yourSavingsRate}%</strong></span>
                      <span className="text-sm text-gray-600">Similar users: {benchmarkData.similarUsersSavingsRate}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div className="h-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full" style={{ width: `${(benchmarkData.yourSavingsRate / 40) * 100}%` }} />
                  </div>
                  <p className="text-sm text-emerald-600 mt-2 font-medium">You're saving 27% more than average!</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-gray-900">Grocery Spending</span>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-600">You: <strong>${benchmarkData.yourGrocerySpend}</strong></span>
                      <span className="text-sm text-gray-600">Similar users: ${benchmarkData.similarUsersGrocerySpend}</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div className="h-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full" style={{ width: `${(benchmarkData.yourGrocerySpend / 600) * 100}%` }} />
                  </div>
                  <p className="text-sm text-emerald-600 mt-2 font-medium">You're spending 13% less than average</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-gray-900">Dining Out</span>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-600">You: <strong>${benchmarkData.yourDiningSpend}</strong></span>
                      <span className="text-sm text-gray-600">Similar users: ${benchmarkData.similarUsersDiningSpend}</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div className="h-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full" style={{ width: `${(benchmarkData.yourDiningSpend / 400) * 100}%` }} />
                  </div>
                  <p className="text-sm text-emerald-600 mt-2 font-medium">You're spending 27% less than average</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* How Astra Works Tab */}
        {activeTab === 'how-it-works' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-3xl p-8 border border-purple-200">
              <div className="flex items-center space-x-4 mb-4">
                <Brain className="w-10 h-10 text-purple-600" />
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">Understanding Astra's AI</h2>
                  <p className="text-purple-800">Transparent, explainable financial intelligence</p>
                </div>
              </div>
            </div>

            {/* How It Works Sections */}
            <div className="space-y-6">
              <div className="bg-white border border-gray-200/80 rounded-3xl p-8 shadow-sm">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-purple-50 rounded-2xl">
                    <BarChart3 className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Pattern Recognition</h3>
                    <p className="text-gray-600 mb-4">
                      Astra analyzes your transaction history using machine learning algorithms to identify spending patterns, behavioral triggers, and anomalies. 
                      The AI examines factors like merchant categories, transaction timing, amounts, and frequency to build a comprehensive profile of your financial habits.
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-sm text-gray-700"><strong>Example:</strong> If you consistently spend more on dining after 8pm on weekends, 
                      Astra identifies this as a pattern and suggests budgeting strategies specific to those timeframes.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200/80 rounded-3xl p-8 shadow-sm">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-purple-50 rounded-2xl">
                    <Target className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Confidence Scores</h3>
                    <p className="text-gray-600 mb-4">
                      Every insight includes a confidence percentage (76-99%) indicating how certain the AI is about its analysis. 
                      Scores above 90% are based on clear, repeated patterns. Scores between 75-90% suggest emerging trends that need more data.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">90-100%</span>
                        <span className="text-sm text-gray-600">High confidence - Clear, established pattern</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">75-89%</span>
                        <span className="text-sm text-gray-600">Moderate confidence - Emerging trend</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold">&lt;75%</span>
                        <span className="text-sm text-gray-600">Low confidence - Insufficient data (not shown)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200/80 rounded-3xl p-8 shadow-sm">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-purple-50 rounded-2xl">
                    <Zap className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Personalized Recommendations</h3>
                    <p className="text-gray-600 mb-4">
                      Astra doesn't provide generic advice. Recommendations are tailored to your specific income, goals, risk tolerance, 
                      and behavioral patterns discovered through the Financial Health Assessment and ongoing transaction analysis.
                    </p>
                    <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                      <p className="text-sm text-purple-900"><strong>How it works:</strong> Your survey responses + spending data + 
                      goal priorities = customized action plans that consider your unique financial situation and psychological relationship with money.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200/80 rounded-3xl p-8 shadow-sm">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-purple-50 rounded-2xl">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Continuous Learning</h3>
                    <AlertCircle className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">What Astra Can't Do</h3>
                    <p className="text-gray-600 mb-4">
                      We believe in transparency about AI limitations. Astra is a tool to support your financial decisions, not replace human judgment.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center mt-0.5 flex-shrink-0">
                          <div className="w-2 h-2 bg-gray-600 rounded-full" />
                        </div>
                        <p className="text-sm text-gray-700"><strong>Cannot predict life events:</strong> Job loss, medical emergencies, or market crashes aren't foreseeable from spending data alone.</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center mt-0.5 flex-shrink-0">
                          <div className="w-2 h-2 bg-gray-600 rounded-full" />
                        </div>
                        <p className="text-sm text-gray-700"><strong>Not financial advice:</strong> Astra provides data-driven suggestions but isn't a licensed financial advisor.</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center mt-0.5 flex-shrink-0">
                          <div className="w-2 h-2 bg-gray-600 rounded-full" />
                        </div>
                        <p className="text-sm text-gray-700"><strong>Limited context:</strong> AI can't understand personal relationships, health issues, or cultural factors affecting financial decisions.</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center mt-0.5 flex-shrink-0">
                          <div className="w-2 h-2 bg-gray-600 rounded-full" />
                        </div>
                        <p className="text-sm text-gray-700"><strong>Requires data:</strong> Insights improve with time. Early recommendations may be generic until patterns emerge.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-3xl p-8 border border-emerald-200">
              <div className="flex items-center space-x-4 mb-4">
                <Shield className="w-10 h-10 text-emerald-600" />
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">Your Data, Your Control</h2>
                  <p className="text-emerald-800">Bank-level security with complete transparency</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white border border-gray-200/80 rounded-3xl p-8 shadow-sm">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-emerald-50 rounded-2xl">
                    <Shield className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">What Data We Collect</h3>
                    <p className="text-gray-600 mb-4">
                      Astra only accesses data necessary to provide financial insights. We use Plaid, a bank-level security platform, 
                      to securely connect to your accounts.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">Transaction data</p>
                          <p className="text-sm text-gray-600">Merchant names, amounts, dates, categories</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">Account balances</p>
                          <p className="text-sm text-gray-600">Current balances for cash flow analysis</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">Survey responses</p>
                          <p className="text-sm text-gray-600">Your Financial Health Assessment answers</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200/80 rounded-3xl p-8 shadow-sm">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-emerald-50 rounded-2xl">
                    <Eye className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">What We Don't Collect</h3>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                          <div className="w-2 h-2 bg-red-600 rounded-full" />
                        </div>
                        <p className="text-sm text-gray-700"><strong>Banking credentials:</strong> Plaid handles authentication. We never see your passwords or login information.</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                          <div className="w-2 h-2 bg-red-600 rounded-full" />
                        </div>
                        <p className="text-sm text-gray-700"><strong>Social Security Numbers:</strong> We don't collect or store SSNs or other sensitive personal identifiers.</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                          <div className="w-2 h-2 bg-red-600 rounded-full" />
                        </div>
                        <p className="text-sm text-gray-700"><strong>Browsing history:</strong> Astra only analyzes financial transactions, not your web activity.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200/80 rounded-3xl p-8 shadow-sm">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-emerald-50 rounded-2xl">
                    <Target className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">How We Use Your Data</h3>
                    <p className="text-gray-600 mb-4">
                      Your financial data is used exclusively to power the AI insights you see in Astra. We never sell your data to third parties.
                    </p>
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                      <p className="text-sm text-emerald-900"><strong>Anonymized benchmarking:</strong> "Similar users" comparisons use aggregated, 
                      anonymized data from users in your income bracket and location. Your specific transactions are never shared.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200/80 rounded-3xl p-8 shadow-sm">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-emerald-50 rounded-2xl">
                    <Zap className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Your Rights</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <p className="font-semibold text-gray-900 mb-2">Export your data</p>
                        <p className="text-sm text-gray-600 mb-3">Download all your transaction data, insights, and survey responses in CSV format.</p>
                        <button className="text-sm text-purple-600 hover:text-purple-700 font-semibold">Export Data</button>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <p className="font-semibold text-gray-900 mb-2">Delete your account</p>
                        <p className="text-sm text-gray-600 mb-3">Permanently remove all your data from Astra's servers within 30 days.</p>
                        <button className="text-sm text-red-600 hover:text-red-700 font-semibold">Request Deletion</button>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <p className="font-semibold text-gray-900 mb-2">Disconnect accounts</p>
                        <p className="text-sm text-gray-600 mb-3">Remove bank connections at any time. Historical data remains for your reference.</p>
                        <button className="text-sm text-purple-600 hover:text-purple-700 font-semibold">Manage Connections</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200/80 rounded-3xl p-8 shadow-sm">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-emerald-50 rounded-2xl">
                    <Shield className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Security Measures</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-emerald-50 rounded-xl">
                        <p className="font-semibold text-emerald-900 mb-1">256-bit encryption</p>
                        <p className="text-sm text-emerald-800">Bank-level data encryption in transit and at rest</p>
                      </div>
                      <div className="p-4 bg-emerald-50 rounded-xl">
                        <p className="font-semibold text-emerald-900 mb-1">SOC 2 certified</p>
                        <p className="text-sm text-emerald-800">Regular third-party security audits</p>
                      </div>
                      <div className="p-4 bg-emerald-50 rounded-xl">
                        <p className="font-semibold text-emerald-900 mb-1">2FA authentication</p>
                        <p className="text-sm text-emerald-800">Two-factor login protection available</p>
                      </div>
                      <div className="p-4 bg-emerald-50 rounded-xl">
                        <p className="font-semibold text-emerald-900 mb-1">Zero-knowledge</p>
                        <p className="text-sm text-emerald-800">Plaid handles all bank authentication</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default InsightsPage;
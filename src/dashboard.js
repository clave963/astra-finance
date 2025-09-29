import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, Brain, DollarSign, Target, AlertCircle, Zap, Eye, Settings, Bell, Search, ChevronDown, ArrowUpRight, ArrowDownRight, Sparkles, Bot, Activity, Plus, Filter, Download, Calendar, AlertTriangle, PlusCircle, Bookmark, ExternalLink, BarChart3, Layers, Coffee, Home, Car, ShoppingBag, Utensils, Gamepad2, Heart, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Dashboard = () => {
  const location = useLocation();
  const [selectedTimeframe, setSelectedTimeframe] = useState('1M');
  const [activeTab, setActiveTab] = useState(() => {
    const path = location.pathname;
    if (path === '/') return 'Overview';
    if (path === '/spending') return 'Spending';
    if (path === '/goals') return 'Goals';
    if (path === '/insights') return 'Insights';
    return 'Overview';
  });
  const [aiInsightIndex, setAiInsightIndex] = useState(0);
  const [showAddCategory, setShowAddCategory] = useState(false);

  // Generate dynamic dates for spending data
  const generateSpendingData = (timeframe) => {
    const now = new Date();
    const data = [];
    let periods = timeframe === '1W' ? 7 : timeframe === '1M' ? 30 : 90;
    
    for (let i = 0; i < periods; i++) {
      const date = new Date(now.getTime() - (periods - 1 - i) * 24 * 60 * 60 * 1000);
      const baseSpending = 150;
      const randomSpend = baseSpending + (Math.random() - 0.5) * 80;
      const income = i % 15 === 0 ? 3200 : 0; // Bi-weekly income
      
      data.push({
        name: date.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        }),
        spending: Math.max(0, randomSpend),
        income: income,
        balance: 2400 + (Math.random() - 0.3) * 500
      });
    }
    return data;
  };

  const [spendingData, setSpendingData] = useState(generateSpendingData('1M'));

  // AI suggested categories for adding
  const suggestedCategories = [
    { name: 'Healthcare', icon: Target, defaultBudget: 200, description: 'Medical expenses, prescriptions, wellness' },
    { name: 'Subscriptions', icon: Settings, defaultBudget: 50, description: 'Netflix, Spotify, apps, memberships' },
    { name: 'Fitness', icon: Activity, defaultBudget: 100, description: 'Gym, classes, sports equipment' },
    { name: 'Personal Care', icon: Sparkles, defaultBudget: 75, description: 'Haircuts, skincare, self-care' },
    { name: 'Home & Garden', icon: Home, defaultBudget: 150, description: 'Household items, plants, maintenance' },
    { name: 'Gifts', icon: Heart, defaultBudget: 100, description: 'Birthday, holiday, special occasion gifts' }
  ];

  useEffect(() => {
    setSpendingData(generateSpendingData(selectedTimeframe));
  }, [selectedTimeframe]);

  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setActiveTab('Overview');
    else if (path === '/spending') setActiveTab('Spending');
    else if (path === '/goals') setActiveTab('Goals');
    else if (path === '/insights') setActiveTab('Insights');
  }, [location]);

  // Spending categories with AI insights and clearer status colors
  const spendingCategories = [
    { name: 'Groceries', amount: 420, budget: 400, icon: ShoppingBag, color: '#6366F1', trend: 'over', status: 'warning' },
    { name: 'Dining Out', amount: 180, budget: 200, icon: Utensils, color: '#8B5CF6', trend: 'under', status: 'good' },
    { name: 'Transportation', amount: 250, budget: 300, icon: Car, color: '#A855F7', trend: 'under', status: 'good' },
    { name: 'Entertainment', amount: 90, budget: 100, icon: Gamepad2, color: '#C084FC', trend: 'under', status: 'good' },
    { name: 'Coffee & Cafes', amount: 85, budget: 60, icon: Coffee, color: '#DDD6FE', trend: 'over', status: 'alert' }
  ];

  // Financial goals with progress
  const financialGoals = [
    { name: 'Emergency Fund', current: 2800, target: 6000, timeline: '8 months', color: '#6366F1' },
    { name: 'Vacation Fund', current: 750, target: 2500, timeline: '6 months', color: '#8B5CF6' },
    { name: 'Home Down Payment', current: 8200, target: 25000, timeline: '18 months', color: '#A855F7' }
  ];

  // Recent transactions with AI categorization
  const recentTransactions = [
    { merchant: 'Whole Foods', amount: -47.23, category: 'Groceries', time: '2 hours ago', aiNote: 'Weekly grocery run - on track' },
    { merchant: 'Starbucks', amount: -5.75, category: 'Coffee', time: '1 day ago', aiNote: 'Consider brewing at home to save $120/month' },
    { merchant: 'Salary Deposit', amount: 3200.00, category: 'Income', time: '2 days ago', aiNote: 'Regular income - excellent consistency' },
    { merchant: 'Netflix', amount: -15.99, category: 'Entertainment', time: '3 days ago', aiNote: 'Subscription within budget' }
  ];

  // AI insights focused on financial wellness
  const aiInsights = [
    {
      type: 'Spending Pattern',
      title: 'Coffee Spending Alert',
      message: 'You\'ve spent 42% more on coffee this month. Brewing at home 3 days per week could save you $45 monthly toward your vacation fund.',
      confidence: 94,
      time: '2 min ago',
      actionLabel: 'See Coffee Alternatives',
      actionType: 'suggestion'
    },
    {
      type: 'Goal Progress',
      title: 'Emergency Fund Milestone',
      message: 'You\'re 47% of the way to your emergency fund goal. You\'re on track to reach it 2 months ahead of schedule.',
      confidence: 87,
      time: '1 hour ago',
      actionLabel: 'Adjust Goal Timeline',
      actionType: 'celebrate'
    },
    {
      type: 'Budget Optimization',
      title: 'Grocery Budget Overage',
      message: 'Your grocery spending is 5% over budget this month. Try meal planning to reduce food waste and stay within your $400 target.',
      confidence: 91,
      time: '3 hours ago',
      actionLabel: 'Get Meal Plan Tips',
      actionType: 'action'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setAiInsightIndex((prev) => (prev + 1) % aiInsights.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [aiInsights.length]);

  const MetricCard = ({ title, value, change, icon: Icon, trend, subtitle, isLarge = false }) => (
    <div className={`group relative bg-white border border-gray-200/80 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 ${
      isLarge ? 'col-span-2' : ''
    }`} style={{ fontFamily: 'Proxima Nova, system-ui, sans-serif' }}>
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100/50 group-hover:from-purple-100 group-hover:to-purple-200/50 transition-all duration-300">
              <Icon className="w-5 h-5 text-purple-600 group-hover:text-purple-700 transition-colors" />
            </div>
            <span className="text-sm font-medium text-gray-600 tracking-wide uppercase letter-spacing-wide">{title}</span>
          </div>
          <div className={`${isLarge ? 'text-3xl' : 'text-2xl'} font-light text-gray-900 mb-3 tracking-tight`} style={{ fontFamily: 'SF Mono, Monaco, monospace' }}>
            {value}
          </div>
          {subtitle && (
            <p className="text-sm text-gray-500 mb-3 leading-relaxed">{subtitle}</p>
          )}
          {change && (
            <div className={`inline-flex items-center text-sm font-semibold px-4 py-2 rounded-full ${
              trend === 'up' 
                ? 'text-emerald-800 bg-emerald-50 border border-emerald-200' 
                : trend === 'down' 
                ? 'text-red-800 bg-red-50 border border-red-200' 
                : 'text-purple-800 bg-purple-50 border border-purple-200'
            }`}>
              {trend === 'up' && <ArrowUpRight className="w-4 h-4 mr-1.5" />}
              {trend === 'down' && <ArrowDownRight className="w-4 h-4 mr-1.5" />}
              {trend === 'neutral' && <Activity className="w-4 h-4 mr-1.5" />}
              {change}
            </div>
          )}
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="p-2.5 text-gray-400 hover:text-purple-600 rounded-xl hover:bg-purple-50 transition-all duration-200">
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-2xl backdrop-blur-sm">
          <p className="font-semibold text-gray-900 mb-3">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between space-x-8">
              <span className="text-gray-600 text-sm capitalize">{entry.dataKey}</span>
              <span className="font-mono text-sm font-semibold text-gray-900">
                ${Math.abs(entry.value)?.toLocaleString()}
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
      {/* Header with enhanced styling */}
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-200/80 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-12">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-3xl bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center shadow-lg">
                    <Brain className="w-7 h-7 text-white" />
                  </div>
                  {/* Subtle pulse effect */}
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
                  placeholder="Search transactions, categories..."
                  className="pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:bg-white focus:ring-4 focus:ring-purple-100 transition-all duration-200 w-80"
                />
              </div>
              
              <nav className="flex space-x-1">
                {['Overview', 'Spending', 'Goals', 'Insights'].map((tab) => (
                  <Link
                    key={tab}
                    to={tab === 'Overview' ? '/' : `/${tab.toLowerCase()}`}
                    className={`px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 rounded-2xl ${
                      activeTab === tab
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
                {/* <Download className="w-5 h-5" /> */}
              </button>
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
        {/* Enhanced AI Coach Insight Banner */}
        <div className="mb-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-purple-500/5 to-indigo-600/10 rounded-3xl" />
          <div className="relative bg-white/80 backdrop-blur-sm border border-purple-200/50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 relative">
                <div className="p-4 bg-gradient-to-br from-purple-600 to-purple-700 rounded-3xl shadow-lg">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-purple-600 to-purple-700 rounded-3xl blur opacity-20 animate-pulse" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-4 mb-3">
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 tracking-wide uppercase">
                    {aiInsights[aiInsightIndex].type}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">{aiInsights[aiInsightIndex].time}</span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                    {aiInsights[aiInsightIndex].confidence}% confidence
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 tracking-tight">
                  {aiInsights[aiInsightIndex].title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {aiInsights[aiInsightIndex].message}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button className={`px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 shadow-sm ${
                  aiInsights[aiInsightIndex].actionType === 'action' 
                    ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-purple-200'
                    : aiInsights[aiInsightIndex].actionType === 'celebrate'
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-200'
                    : 'bg-white text-purple-600 border-2 border-purple-200 hover:bg-purple-50'
                }`}>
                  {aiInsights[aiInsightIndex].actionLabel}
                </button>
                <button className="p-3 text-gray-400 hover:text-gray-600 rounded-2xl hover:bg-white/50 transition-all duration-200">
                  <Eye className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Financial Health Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <MetricCard
            title="Available Balance"
            value="$2,847"
            change="Safe spending level"
            trend="neutral"
            icon={DollarSign}
            subtitle="After bills and goals"
          />
          <MetricCard
            title="This Month Spending"
            value="$1,025"
            change="15% under budget"
            trend="up"
            icon={TrendingDown}
            subtitle="You're doing great!"
          />
          <MetricCard
            title="Emergency Fund"
            value="$2,800"
            change="47% to goal"
            trend="up"
            icon={Target}
            subtitle="2 months ahead of schedule"
          />
          <MetricCard
            title="Financial Health"
            value="Excellent"
            change="Improved this month"
            trend="up"
            icon={Brain}
            subtitle="8.7/10 score"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Enhanced Cash Flow Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200/80 rounded-3xl p-10 shadow-sm hover:shadow-xl transition-all duration-500">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-light text-gray-900 mb-2 tracking-tight">Spending & Income Flow</h2>
                  <p className="text-gray-600 text-lg">Your money in and out over time</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 bg-gray-100 rounded-2xl p-1.5">
                    {['1W', '1M', '3M'].map((timeframe) => (
                      <button
                        key={timeframe}
                        onClick={() => setSelectedTimeframe(timeframe)}
                        className={`px-5 py-2.5 text-sm font-semibold transition-all duration-300 rounded-xl ${
                          selectedTimeframe === timeframe
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        {timeframe}
                      </button>
                    ))}
                  </div>
                  <button className="p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <ResponsiveContainer width="100%" height={480}>
                <AreaChart data={spendingData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <defs>
                    <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" stopOpacity={0.3}/>
                      <stop offset="100%" stopColor="#10B981" stopOpacity={0.05}/>
                    </linearGradient>
                    <linearGradient id="spendingGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                      <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.05}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#9CA3AF"
                    fontSize={12}
                    fontWeight={500}
                    tickLine={false}
                    axisLine={false}
                    dy={10}
                  />
                  <YAxis 
                    stroke="#9CA3AF"
                    fontSize={12}
                    fontWeight={500}
                    tickLine={false}
                    axisLine={false}
                    dx={-10}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="income"
                    stroke="#10B981"
                    strokeWidth={3}
                    fill="url(#incomeGradient)"
                  />
                  <Area
                    type="monotone"
                    dataKey="spending"
                    stroke="#8B5CF6"
                    strokeWidth={3}
                    fill="url(#spendingGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>

              <div className="flex items-center justify-center mt-8 space-x-10">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full bg-emerald-500" />
                  <span className="text-gray-600 font-medium">Income</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full bg-purple-500" />
                  <span className="text-gray-600 font-medium">Spending</span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Spending Categories */}
          <div className="space-y-8">
            <div className="bg-white border border-gray-200/80 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-light text-gray-900 tracking-tight">Spending Categories</h3>
                <button 
                  onClick={() => setShowAddCategory(!showAddCategory)}
                  className="p-2.5 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200"
                >
                  {showAddCategory ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </button>
              </div>
              
              {/* Add Category Modal */}
              {showAddCategory && (
                <div className="mb-6 p-6 bg-purple-50 border border-purple-200 rounded-2xl">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Add New Category</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {suggestedCategories.slice(0, 3).map((suggestion, index) => {
                      const Icon = suggestion.icon;
                      return (
                        <button
                          key={index}
                          className="flex items-center justify-between p-3 bg-white border border-purple-200 rounded-xl hover:bg-purple-50 transition-colors text-left"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="p-2 rounded-lg bg-purple-100">
                              <Icon className="w-4 h-4 text-purple-600" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{suggestion.name}</div>
                              <div className="text-xs text-gray-500">{suggestion.description}</div>
                            </div>
                          </div>
                          <div className="text-sm font-mono text-gray-600">${suggestion.defaultBudget}</div>
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-4 pt-4 border-t border-purple-200">
                    <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                      + Create Custom Category
                    </button>
                  </div>
                </div>
              )}
              
              <div className="space-y-6">
                {spendingCategories.map((category, index) => {
                  const Icon = category.icon;
                  const percentage = (category.amount / category.budget) * 100;
                  return (
                    <div key={index} className="group">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100/50">
                            <Icon className="w-5 h-5 text-purple-600" />
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-gray-900">{category.name}</span>
                            {category.status === 'alert' && (
                              <div className="relative group">
                                <AlertTriangle className="w-4 h-4 text-red-500 cursor-help" />
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                                  Significantly over budget - consider reducing frequency
                                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                                </div>
                              </div>
                            )}
                            {category.status === 'warning' && (
                              <div className="relative group">
                                <AlertCircle className="w-4 h-4 text-orange-500 cursor-help" />
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                                  Slightly over budget - monitor spending closely
                                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-mono text-lg font-semibold text-gray-900">${category.amount}</div>
                          <div className={`text-sm font-medium ${category.trend === 'over' ? 'text-red-600' : 'text-emerald-600'}`}>
                            ${category.budget} budget
                          </div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                        <div 
                          className={`h-3 rounded-full transition-all duration-1000 ease-out ${
                            percentage > 100 
                              ? 'bg-gradient-to-r from-red-500 to-red-600' 
                              : percentage > 90 
                              ? 'bg-gradient-to-r from-orange-500 to-orange-600'
                              : 'bg-gradient-to-r from-emerald-500 to-emerald-600'
                          }`}
                          style={{ 
                            width: `${Math.min(percentage, 100)}%`
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-8 p-6 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl border border-purple-200/50">
                <div className="flex items-center space-x-3 mb-3">
                  <Brain className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-semibold text-purple-900 uppercase tracking-wide">AI Insight</span>
                </div>
                <p className="text-sm text-purple-800 leading-relaxed">
                  You're spending most efficiently on transportation. Consider reducing coffee expenses to boost your vacation fund.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Goals Progress & Recent Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-16">
          {/* Enhanced Financial Goals */}
          <div className="bg-white border border-gray-200/80 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-light text-gray-900 tracking-tight">Your Financial Goals</h3>
              <button className="text-sm text-purple-600 hover:text-purple-700 font-semibold">Add Goal</button>
            </div>
            
             <div className="space-y-6">
               {financialGoals.map((goal, index) => {
                 const progress = (goal.current / goal.target) * 100;
                 return (
                   <div key={index} className="space-y-3">
                     <div className="flex items-center justify-between">
                       <span className="font-semibold text-gray-900 text-lg">{goal.name}</span>
                       <div className="text-right">
                         <div className="font-mono text-lg font-semibold text-gray-900">
                           ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                         </div>
                         <div className="text-sm text-gray-500 font-medium">{goal.timeline} to go</div>
                       </div>
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
                     <div className="text-sm text-gray-600 font-medium">
                       {Math.round(progress)}% complete - {progress > 75 ? 'Almost there!' : progress > 50 ? 'Great progress!' : 'Keep going!'}
                     </div>
                   </div>
                 );
               })}
            </div>
          </div>

          {/* Enhanced Recent Transactions */}
          <div className="bg-white border border-gray-200/80 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-light text-gray-900 tracking-tight">Recent Activity</h3>
              <button className="text-sm text-purple-600 hover:text-purple-700 font-semibold">View All</button>
            </div>
            
             <div className="space-y-4">
               {recentTransactions.map((transaction, index) => (
                 <div key={index} className="p-4 rounded-2xl hover:bg-gray-50 transition-all duration-300 border border-gray-100">
                   <div className="flex items-center justify-between mb-2">
                     <div className="flex items-center space-x-4">
                       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                         transaction.amount > 0 ? 'bg-emerald-100' : 'bg-gray-100'
                       }`}>
                         <span className={`text-sm font-bold ${
                           transaction.amount > 0 ? 'text-emerald-700' : 'text-gray-700'
                         }`}>
                           {transaction.merchant.charAt(0)}
                         </span>
                       </div>
                       <div>
                         <p className="font-semibold text-gray-900">{transaction.merchant}</p>
                         <p className="text-sm text-gray-500 font-medium">{transaction.category} • {transaction.time}</p>
                       </div>
                     </div>
                     <div className={`font-mono text-lg font-semibold ${
                       transaction.amount > 0 ? 'text-emerald-700' : 'text-gray-900'
                     }`}>
                       {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                     </div>
                   </div>
                   <div className="ml-16 text-sm text-purple-600 bg-purple-50 rounded-lg p-2 border border-purple-200">
                     <Brain className="w-4 h-4 inline mr-2" />
                     {transaction.aiNote}
                   </div>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Enhanced Footer */}
        <footer className="mt-20 border-t border-gray-200 bg-white/50 backdrop-blur-sm">
          <div className="py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-light text-gray-900">Astra</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Intelligent personal finance coaching powered by advanced AI algorithms and behavioral psychology.
                </p>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-500 font-medium">Secure & Private</span>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-6 uppercase tracking-wide">Platform</h4>
                <ul className="space-y-4">
                  <li><a href="#" className="text-sm text-gray-600 hover:text-purple-600 transition-colors font-medium">Spending Analysis</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-purple-600 transition-colors font-medium">Goal Planning</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-purple-600 transition-colors font-medium">AI Insights</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-purple-600 transition-colors font-medium">Bank Integration</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-6 uppercase tracking-wide">Resources</h4>
                <ul className="space-y-4">
                  <li><a href="#" className="text-sm text-gray-600 hover:text-purple-600 transition-colors font-medium">Financial Education</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-purple-600 transition-colors font-medium">Privacy Policy</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-purple-600 transition-colors font-medium">Help Center</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-purple-600 transition-colors font-medium">API Documentation</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-6 uppercase tracking-wide">Company</h4>
                <ul className="space-y-4">
                  <li><a href="#" className="text-sm text-gray-600 hover:text-purple-600 transition-colors font-medium">About</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-purple-600 transition-colors font-medium">Security</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-purple-600 transition-colors font-medium">Careers</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-purple-600 transition-colors font-medium">Contact</a></li>
                </ul>
              </div>
            </div>
            
             <div className="border-t border-gray-200 mt-12 pt-8 flex items-center justify-between">
               <p className="text-sm text-gray-500">© 2024 Astra</p>
               <div className="flex items-center space-x-2">
                 <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                 <span className="text-xs text-gray-500 font-medium">AI Active</span>
               </div>
             </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;
import React, { useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Brain, DollarSign, Settings, Bell, Search, Sparkles, Download, CreditCard, MapPin, Clock, SortAsc, SortDesc } from 'lucide-react';
import { Link } from 'react-router-dom';

const SpendingPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');

  // Generate transactions based on selected time period
  const generateTransactionsForPeriod = (period) => {
    const baseTransactions = [
      { id: 1, merchant: 'Whole Foods Market', category: 'Groceries', amount: -47.23, location: 'Cambridge, MA', aiCategory: 'Groceries', confidence: 98, aiNote: 'Weekly grocery run - typical spending pattern' },
      { id: 2, merchant: 'Starbucks', category: 'Coffee', amount: -5.75, location: 'Harvard Square', aiCategory: 'Coffee & Cafes', confidence: 95, aiNote: 'Consider brewing at home 3x/week to save $45/month' },
      { id: 3, merchant: 'Uber', category: 'Transportation', amount: -18.40, location: 'Boston, MA', aiCategory: 'Transportation', confidence: 92, aiNote: 'Weekend ride - within transportation budget' },
      { id: 4, merchant: 'Netflix', category: 'Entertainment', amount: -15.99, location: 'Online', aiCategory: 'Entertainment', confidence: 99, aiNote: 'Monthly subscription - budget optimized' },
      { id: 5, merchant: 'Target', category: 'Shopping', amount: -82.14, location: 'Somerville, MA', aiCategory: 'Personal Care', confidence: 87, aiNote: 'Mixed purchase - household items and personal care' },
      { id: 6, merchant: 'Shell Gas Station', category: 'Transportation', amount: -45.20, location: 'Route 1, MA', aiCategory: 'Transportation', confidence: 96, aiNote: 'Gas fill-up - efficient timing before prices increased' },
      { id: 7, merchant: 'CVS Pharmacy', category: 'Healthcare', amount: -24.99, location: 'Porter Square', aiCategory: 'Healthcare', confidence: 89, aiNote: 'Prescription pickup - healthcare necessity' },
      { id: 8, merchant: 'Chipotle', category: 'Dining Out', amount: -12.45, location: 'Harvard Square', aiCategory: 'Dining Out', confidence: 94, aiNote: 'Lunch out - within dining budget this week' },
      { id: 9, merchant: 'Apple Store', category: 'Technology', amount: -1299.00, location: 'Boylston St, Boston', aiCategory: 'Technology', confidence: 99, aiNote: 'Large purchase - consider if this fits planned technology budget' },
      { id: 10, merchant: 'Dunkin', category: 'Coffee', amount: -4.85, location: 'Central Square', aiCategory: 'Coffee & Cafes', confidence: 97, aiNote: 'Daily coffee habit - brewing at home could save $120/month' }
    ];

    const now = new Date();
    let dateOffset = 0;
    
    // Adjust date offset based on period
    switch(period) {
      case 'Last Month':
        dateOffset = 30;
        break;
      case 'Last 3 Months':
        dateOffset = 60;
        break;
      case 'This Year':
        dateOffset = 0;
        break;
      default: // This Month
        dateOffset = 0;
    }

    return baseTransactions.map((transaction, index) => ({
      ...transaction,
      date: new Date(now.getTime() - (dateOffset + index) * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }));
  };

  // Generate spending trends based on selected period
  const generateSpendingTrendsForPeriod = (period) => {
    const baseMultiplier = period === 'Last Month' ? 0.8 : period === 'Last 3 Months' ? 0.9 : 1;
    
    return [
      { period: 'Week 1', groceries: Math.round(98 * baseMultiplier), dining: Math.round(45 * baseMultiplier), transport: Math.round(67 * baseMultiplier), coffee: Math.round(28 * baseMultiplier), entertainment: Math.round(32 * baseMultiplier) },
      { period: 'Week 2', groceries: Math.round(112 * baseMultiplier), dining: Math.round(67 * baseMultiplier), transport: Math.round(45 * baseMultiplier), coffee: Math.round(32 * baseMultiplier), entertainment: Math.round(28 * baseMultiplier) },
      { period: 'Week 3', groceries: Math.round(89 * baseMultiplier), dining: Math.round(78 * baseMultiplier), transport: Math.round(89 * baseMultiplier), coffee: Math.round(35 * baseMultiplier), entertainment: Math.round(45 * baseMultiplier) },
      { period: 'Week 4', groceries: Math.round(125 * baseMultiplier), dining: Math.round(34 * baseMultiplier), transport: Math.round(76 * baseMultiplier), coffee: Math.round(29 * baseMultiplier), entertainment: Math.round(67 * baseMultiplier) }
    ];
  };

  // Sample transaction data that updates based on period
  const allTransactions = generateTransactionsForPeriod(selectedPeriod);

  // Spending trends data that updates based on period
  const spendingTrends = generateSpendingTrendsForPeriod(selectedPeriod);

  // Category comparison data
  const categoryComparison = [
    { category: 'Groceries', thisMonth: 424, lastMonth: 389, budget: 400, avgSpend: 412 },
    { category: 'Dining Out', thisMonth: 224, lastMonth: 267, budget: 200, avgSpend: 245 },
    { category: 'Transportation', thisMonth: 187, lastMonth: 198, budget: 250, avgSpend: 203 },
    { category: 'Coffee & Cafes', thisMonth: 124, lastMonth: 98, budget: 80, avgSpend: 92 },
    { category: 'Entertainment', thisMonth: 172, lastMonth: 145, budget: 150, avgSpend: 158 },
    { category: 'Healthcare', thisMonth: 67, lastMonth: 45, budget: 100, avgSpend: 78 },
    { category: 'Technology', thisMonth: 1299, lastMonth: 0, budget: 200, avgSpend: 150 }
  ];

  // Filter transactions based on search and category
  const filteredTransactions = allTransactions.filter(transaction => {
    const matchesSearch = transaction.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || transaction.aiCategory === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort transactions
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    let comparison = 0;
    switch (sortBy) {
      case 'date':
        comparison = new Date(a.date) - new Date(b.date);
        break;
      case 'amount':
        comparison = Math.abs(a.amount) - Math.abs(b.amount);
        break;
      case 'merchant':
        comparison = a.merchant.localeCompare(b.merchant);
        break;
      default:
        comparison = 0;
    }
    return sortOrder === 'desc' ? -comparison : comparison;
  });

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

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
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
                  placeholder="Search transactions, merchants..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:bg-white focus:ring-4 focus:ring-purple-100 transition-all duration-200 w-80"
                />
              </div>
              
              <nav className="flex space-x-1">
                {['Overview', 'Spending', 'Goals', 'Insights'].map((tab) => (
                  <Link
                    key={tab}
                    to={tab === 'Overview' ? '/' : `/${tab.toLowerCase()}`}
                    className={`px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 rounded-2xl ${
                      tab === 'Spending'
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
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-light text-gray-900 mb-3 tracking-tight">Spending Analysis</h1>
          <p className="text-xl text-gray-600">Deep dive into your spending patterns with AI-powered insights</p>
        </div>

        {/* Main Content with Right Sidebar Layout */}
        <div className="flex gap-8">
          {/* Main Content Area */}
          <div className="flex-1">
            {/* Filters Section */}
            <div className="mb-8 bg-white border border-gray-200/80 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Time Period</label>
                    <select 
                      value={selectedPeriod}
                      onChange={(e) => setSelectedPeriod(e.target.value)}
                      className="px-4 py-2 border border-gray-200 rounded-xl bg-white text-sm focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
                    >
                      <option>This Month</option>
                      <option>Last Month</option>
                      <option>Last 3 Months</option>
                      <option>This Year</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
                    <select 
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-4 py-2 border border-gray-200 rounded-xl bg-white text-sm focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
                    >
                      <option>All Categories</option>
                      <option>Groceries</option>
                      <option>Dining Out</option>
                      <option>Transportation</option>
                      <option>Coffee & Cafes</option>
                      <option>Entertainment</option>
                      <option>Healthcare</option>
                      <option>Technology</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-500">
                    {filteredTransactions.length} transactions • Total: ${Math.abs(filteredTransactions.reduce((sum, t) => sum + t.amount, 0)).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Transaction History */}
            <div className="mb-8 bg-white border border-gray-200/80 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-light text-gray-900 tracking-tight">Transaction History</h3>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handleSort('date')}
                    className={`p-2 rounded-lg transition-colors ${sortBy === 'date' ? 'bg-purple-100 text-purple-600' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    <Clock className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleSort('amount')}
                    className={`p-2 rounded-lg transition-colors ${sortBy === 'amount' ? 'bg-purple-100 text-purple-600' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    <DollarSign className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleSort('merchant')}
                    className={`p-2 rounded-lg transition-colors ${sortBy === 'merchant' ? 'bg-purple-100 text-purple-600' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {sortedTransactions.map((transaction) => (
                  <div key={transaction.id} className="p-4 rounded-2xl border border-gray-100 hover:bg-gray-50 transition-colors group">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center">
                          <CreditCard className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-semibold text-gray-900">{transaction.merchant}</h4>
                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                              transaction.confidence > 95 ? 'bg-green-100 text-green-700' :
                              transaction.confidence > 85 ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {transaction.confidence}% AI match
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                            <span>{new Date(transaction.date).toLocaleDateString()}</span>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3" />
                              <span>{transaction.location}</span>
                            </div>
                            <span className="px-2 py-1 bg-gray-100 rounded-lg text-xs">{transaction.aiCategory}</span>
                          </div>
                          <div className="text-xs text-purple-600 bg-purple-50 rounded-lg p-2 border border-purple-200">
                            <Brain className="w-3 h-3 inline mr-1" />
                            {transaction.aiNote}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-lg font-semibold text-gray-900">
                          ${Math.abs(transaction.amount).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Spending Trends Chart */}
            <div className="mb-8 bg-white border border-gray-200/80 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-light text-gray-900 mb-2 tracking-tight">Weekly Spending Trends</h2>
                  <p className="text-gray-600 text-lg">Category breakdown over the past month</p>
                </div>
                <button className="p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors">
                  <Download className="w-5 h-5" />
                </button>
              </div>
              
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={spendingTrends} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <defs>
                    <linearGradient id="groceriesGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366F1" stopOpacity={0.3}/>
                      <stop offset="100%" stopColor="#6366F1" stopOpacity={0.05}/>
                    </linearGradient>
                    <linearGradient id="diningGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                      <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.05}/>
                    </linearGradient>
                    <linearGradient id="transportGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#EC4899" stopOpacity={0.3}/>
                      <stop offset="100%" stopColor="#EC4899" stopOpacity={0.05}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                  <XAxis dataKey="period" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="groceries" stackId="1" stroke="#6366F1" fill="url(#groceriesGrad)" />
                  <Area type="monotone" dataKey="dining" stackId="1" stroke="#8B5CF6" fill="url(#diningGrad)" />
                  <Area type="monotone" dataKey="transport" stackId="1" stroke="#EC4899" fill="url(#transportGrad)" />
                  <Area type="monotone" dataKey="coffee" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.2} />
                  <Area type="monotone" dataKey="entertainment" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Category Performance */}
            <div className="bg-white border border-gray-200/80 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500">
              <h3 className="text-2xl font-light text-gray-900 mb-6 tracking-tight">Category Performance</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categoryComparison.map((category, index) => {
                  const budgetPerformance = (category.thisMonth / category.budget) * 100;
                  const monthComparison = ((category.thisMonth - category.lastMonth) / category.lastMonth) * 100;
                  return (
                    <div key={index} className="p-6 rounded-2xl border border-gray-100 hover:bg-gray-50 transition-colors min-h-[180px] flex flex-col">
                      <div className="text-center mb-4">
                        <span className="font-semibold text-gray-900 text-lg">{category.category}</span>
                      </div>
                      
                      <div className="text-center mb-4">
                        <div className="font-mono text-2xl font-semibold text-gray-900 mb-1">${category.thisMonth}</div>
                        <div className={`text-sm font-medium ${monthComparison >= 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                          {monthComparison >= 0 ? '+' : ''}{monthComparison.toFixed(1)}% vs last month
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                        <span>Budget: ${category.budget}</span>
                        <span>Avg: ${category.avgSpend}</span>
                      </div>
                      
                      <div className="w-full bg-gray-100 rounded-full h-3 mt-auto">
                        <div 
                          className={`h-3 rounded-full transition-all duration-1000 ${
                            budgetPerformance > 100 ? 'bg-red-500' : budgetPerformance > 90 ? 'bg-orange-500' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${Math.min(budgetPerformance, 100)}%` }}
                        />
                      </div>
                      
                      <div className="text-xs text-gray-500 mt-2 text-center">
                        {Math.round(budgetPerformance)}% of budget used
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* AI Insight Right Sidebar */}
          <div className="w-80 flex-shrink-0">
            <div className="sticky top-24">
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-indigo-600/10 rounded-3xl" />
                <div className="relative bg-white/80 backdrop-blur-sm border border-purple-200/50 rounded-3xl p-6 shadow-lg">
                  <div className="text-center mb-4">
                    <div className="inline-flex p-3 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl shadow-lg mb-3">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-xs font-semibold bg-purple-100 text-purple-800 tracking-wide uppercase px-2 py-1 rounded-full mb-2">
                      AI Insight
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Technology Purchase Detected
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    $1,299 tech purchase detected - 549% above typical monthly spending. Appears planned based on research patterns.
                  </p>
                  <button className="w-full px-4 py-3 bg-purple-600 text-white rounded-xl text-sm font-semibold hover:bg-purple-700 transition-colors">
                    Adjust Budget
                  </button>
                  <div className="text-xs text-gray-500 mt-2 text-center">Updated hourly</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SpendingPage;
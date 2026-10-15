import React, { useState, useEffect, useMemo } from 'react';
import {
  Dumbbell,
  UserCheck,
  Calendar,
  CreditCard,
  Activity,
  Award,
  Users,
  Flame,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  Lock,
  LogOut,
  ChevronRight,
  BarChart2,
  PieChart,
  Search,
  Plus,
  Trash2,
  Edit,
  Shield,
  FileText,
  HelpCircle,
  Menu,
  X,
  Check,
  Zap,
  Heart,
  TrendingUp,
  Download,
  AlertTriangle,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

const INITIAL_TRAINERS = [
  {
    id: 'tr-1',
    name: 'MD ZISHAN',
    role: 'Founder & Master Head Coach',
    specialty: 'Bodybuilding, Functional Strength & Athletic Performance',
    experience: '10+ Years',
    rating: 4.98,
    reviews: 320,
    price: 99,
    bio: 'Founder of MD ZISHAN FITNESS. Dedicated to transforming mindsets and building elite physiques through science-backed hypertrophy and strength protocols.',
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&q=80&w=800',
    slots: ['07:00 AM', '09:00 AM', '05:00 PM', '07:00 PM']
  },
  {
    id: 'tr-2',
    name: 'Sarah Jenkins',
    role: 'Senior HIIT & Metabolic Conditioning Coach',
    specialty: 'Fat Loss, Endurance & Calisthenics',
    experience: '6 Years',
    rating: 4.9,
    reviews: 185,
    price: 65,
    bio: 'Specialist in high-intensity fat burn and metabolic conditioning. Empowering clients to break plateaus with dynamic daily routines.',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=800',
    slots: ['08:00 AM', '10:00 AM', '04:00 PM', '06:00 PM']
  },
  {
    id: 'tr-3',
    name: 'Alex Rivera',
    role: 'Powerlifting & Biomechanics Specialist',
    specialty: 'Heavy Compound Lifting & Injury Rehabilitation',
    experience: '8 Years',
    rating: 4.92,
    reviews: 210,
    price: 75,
    bio: 'Focused on raw force, precise technique, squat/bench/deadlift optimization, and joint structural longevity.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
    slots: ['06:00 AM', '11:00 AM', '03:00 PM', '08:00 PM']
  },
  {
    id: 'tr-4',
    name: 'Maya Patel',
    role: 'Mobility, Yoga & Core Specialist',
    specialty: 'Vinyasa Yoga, Posture & Active Recovery',
    experience: '5 Years',
    rating: 4.88,
    reviews: 142,
    price: 55,
    bio: 'Integrating dynamic flexibility, core stability, breathwork, and posture restoration for complete functional wellness.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
    slots: ['07:30 AM', '09:30 AM', '05:30 PM']
  }
];

const FACILITIES = [
  {
    id: 'fac-1',
    title: 'Heavy Iron Power Zone',
    category: 'Heavy Lifting',
    desc: 'Olympic platforms, ELEIKO competition plates, custom dumbbell racks up to 70kg, and power cages.',
    img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'fac-2',
    title: 'Cardio & Oxygen Deck',
    category: 'Cardio',
    desc: 'Interactive TechnoGym treadmills, StairMasters, air bikes, and rowing machines with telemetry monitoring.',
    img: 'https://images.unsplash.com/photo-1576678927484-cc909957088c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'fac-3',
    title: 'Infrared Sauna & Recovery Spa',
    category: 'Sauna & Spa',
    desc: 'Detoxifying infrared sauna, contrast ice bath tubs, and full massage recovery lounge.',
    img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'fac-4',
    title: 'CrossFit & Turf Arena',
    category: 'Crossfit',
    desc: '30m indoor turf track, sled pull tracks, gymnastic rings, wall ball target zones, and kettlebells.',
    img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'fac-5',
    title: 'Olympic Hydro Lap Pool',
    category: 'Pool',
    desc: '25-meter temperature-controlled 4-lane lap pool with certified lifeguard supervision and aquatic conditioning classes.',
    img: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'fac-6',
    title: 'ZISHAN Fuel Bar & Lounge',
    category: 'Nutrition Bar',
    desc: 'Fresh whey isolate shakes, BCAA elixirs, cold brew coffee, and macro-calculated meal prep box pickups.',
    img: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80&w=800'
  }
];

const EXERCISES = [
  { id: 'ex-1', name: 'Barbell Incline Bench Press', category: 'Chest', level: 'Intermediate', sets: '4 Sets x 8-10 Reps', calories: '~120 kcal', desc: 'Focus on upper pectoral development with a 30-degree bench angle. Maintain controlled eccentric phase.' },
  { id: 'ex-2', name: 'Cable Pectoral Flyes', category: 'Chest', level: 'Beginner', sets: '3 Sets x 12-15 Reps', calories: '~80 kcal', desc: 'Isolate mid-chest fibers with peak contraction at full shoulder adduction.' },
  { id: 'ex-3', name: 'Deadlift (Conventional/Sumo)', category: 'Back', level: 'Advanced', sets: '4 Sets x 5 Reps', calories: '~200 kcal', desc: 'King of posterior chain movements. Engage lats, maintain neutral spine, push through floor.' },
  { id: 'ex-4', name: 'Wide-Grip Lat Pulldown', category: 'Back', level: 'Beginner', sets: '4 Sets x 10-12 Reps', calories: '~90 kcal', desc: 'Pull bar down toward upper chest while driving elbows down and back.' },
  { id: 'ex-5', name: 'Overhead Barbell Press', category: 'Shoulders', level: 'Intermediate', sets: '4 Sets x 6-8 Reps', calories: '~110 kcal', desc: 'Strict deltoid press. Squeeze glutes and core to avoid hyper-extending the lower back.' },
  { id: 'ex-6', name: 'Dumbbell Lateral Raises', category: 'Shoulders', level: 'Beginner', sets: '4 Sets x 15 Reps', calories: '~60 kcal', desc: 'Target side delts. Lead with elbows, soft knee bend, controlled return.' },
  { id: 'ex-7', name: 'Barbell Back Squat', category: 'Legs', level: 'Intermediate', sets: '4 Sets x 6-8 Reps', calories: '~180 kcal', desc: 'Deep knee bend engaging quadriceps and glutes. Keep chest up and knees tracking over toes.' },
  { id: 'ex-8', name: 'Romanian Deadlift (RDL)', category: 'Legs', level: 'Intermediate', sets: '3 Sets x 10 Reps', calories: '~130 kcal', desc: 'Hinge at hips to load hamstrings and glutes with a slight knee bend.' },
  { id: 'ex-9', name: 'Barbell Bicep Curl', category: 'Arms', level: 'Beginner', sets: '3 Sets x 10-12 Reps', calories: '~70 kcal', desc: 'Strict bicep isolation without swinging hips or shoulders.' },
  { id: 'ex-10', name: 'Tricep Rope Pushdown', category: 'Arms', level: 'Beginner', sets: '4 Sets x 12 Reps', calories: '~65 kcal', desc: 'Lock elbows to ribs, spread rope outward at peak bottom contraction.' },
  { id: 'ex-11', name: 'Hanging Leg Raise', category: 'Core', level: 'Intermediate', sets: '3 Sets x 15 Reps', calories: '~50 kcal', desc: 'Target lower abdominal wall and hip flexors. Avoid momentum.' },
  { id: 'ex-12', name: 'Battle Ropes Slam', category: 'HIIT', level: 'All Levels', sets: '5 Rounds x 45 Sec', calories: '~150 kcal', desc: 'Full-body explosive anaerobic conditioning and shoulder stamina building.' }
];

const GYM_CLASSES = [
  { id: 'c-1', name: 'Power Lifting Blast', trainer: 'Alex Rivera', time: '06:00 AM - 07:00 AM', days: 'Mon, Wed, Fri', room: 'Arena 1', spots: 4 },
  { id: 'c-2', name: 'Z-HIIT Fat Burn', trainer: 'Sarah Jenkins', time: '08:00 AM - 09:00 AM', days: 'Mon, Tue, Thu', room: 'Turf Zone', spots: 2 },
  { id: 'c-3', name: 'Z-Yoga & Mobility', trainer: 'Maya Patel', time: '09:30 AM - 10:30 AM', days: 'Tue, Thu, Sat', room: 'Mind & Body Studio', spots: 8 },
  { id: 'c-4', name: 'Hypertrophy Chest & Arms', trainer: 'MD ZISHAN', time: '05:00 PM - 06:15 PM', days: 'Mon, Wed, Fri', room: 'Iron Vault', spots: 1 },
  { id: 'c-5', name: 'Core Conditioning & Spin', trainer: 'Sarah Jenkins', time: '06:30 PM - 07:30 PM', days: 'Daily', room: 'Cycle Studio', spots: 6 }
];

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // User & Auth State (persisted local simulation)
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('zishan_user');
    return saved ? JSON.parse(saved) : {
      name: 'John Athlete',
      email: 'john@example.com',
      phone: '+1 555 019 2831',
      membershipPlan: 'Quarterly Pro',
      expiryDate: '2026-12-31',
      status: 'Active',
      joinDate: '2026-01-15'
    };
  });

  // Admin Mode
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminPasscode, setAdminPasscode] = useState('');
  const [adminAuthError, setAdminAuthError] = useState('');

  // Application Data States
  const [trainersList, setTrainersList] = useState(INITIAL_TRAINERS);
  const [membershipsList, setMembershipsList] = useState([
    { id: 'm-1', name: 'Starter Monthly', price: 29, billing: 'Monthly', duration: '30 Days', features: ['Full Gym Floor Access', 'Locker Room & Showers', 'Fitness Orientation', 'Free Mobile App Tracker'], pttraining: false, popular: false },
    { id: 'm-2', name: 'Quarterly Pro', price: 79, billing: 'Every 3 Months', duration: '90 Days', features: ['All Starter Features', 'Infrared Sauna Access', '2 Guest Passes / Month', '1 Free Trainer Session', '10% Discount at Fuel Bar'], pttraining: true, popular: true },
    { id: 'm-3', name: 'Half-Yearly Elite', price: 139, billing: 'Every 6 Months', duration: '180 Days', features: ['All Pro Features', 'Hydro Lap Pool Access', 'Unlimited Sauna & Cold Plunge', '4 Free Trainer Sessions', 'Complimentary Hydration Drinks'], pttraining: true, popular: false },
    { id: 'm-4', name: 'Yearly VIP Master', price: 249, billing: 'Billed Annually', duration: '365 Days', features: ['All Elite Features', 'Reserved Locker', 'Unlimited Guest Passes', '24/7 VIP Gym Access', 'Monthly Dietician Consult', 'Official Gym Hoodie Kit'], pttraining: true, popular: false }
  ]);

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('zishan_bookings');
    return saved ? JSON.parse(saved) : [
      { id: 'BK-9912', trainerName: 'MD ZISHAN', service: 'Personal Training Session', date: '2026-10-18', time: '05:00 PM', status: 'Confirmed', price: 99, createdAt: '2026-10-10' },
      { id: 'BK-8841', trainerName: 'Sarah Jenkins', service: 'HIIT Conditioning', date: '2026-10-22', time: '08:00 AM', status: 'Completed', price: 65, createdAt: '2026-10-01' }
    ];
  });

  const [workoutLogs, setWorkoutLogs] = useState(() => {
    const saved = localStorage.getItem('zishan_workouts');
    return saved ? JSON.parse(saved) : [
      { id: 'wl-1', date: '2026-10-12', exercise: 'Barbell Back Squat', weight: '100 kg', sets: 4, reps: 8 },
      { id: 'wl-2', date: '2026-10-13', exercise: 'Incline Bench Press', weight: '80 kg', sets: 4, reps: 10 },
      { id: 'wl-3', date: '2026-10-14', exercise: 'Conventional Deadlift', weight: '140 kg', sets: 3, reps: 5 }
    ];
  });

  const [attendanceLogs, setAttendanceLogs] = useState(() => {
    const saved = localStorage.getItem('zishan_attendance');
    return saved ? JSON.parse(saved) : [
      { id: 'att-1', date: '2026-10-14', time: '07:15 AM', status: 'Present', station: 'Main Gym Floor' },
      { id: 'att-2', date: '2026-10-13', time: '05:30 PM', status: 'Present', station: 'Cardio Deck' },
      { id: 'att-3', date: '2026-10-11', time: '06:45 AM', status: 'Present', station: 'Power Zone' }
    ];
  });

  const [paymentsHistory, setPaymentsHistory] = useState([
    { id: 'PAY-77123', plan: 'Quarterly Pro Plan', amount: 79, date: '2026-10-01', status: 'Successful', method: 'Razorpay UPI' },
    { id: 'PAY-66512', plan: 'Trainer Session - MD ZISHAN', amount: 99, date: '2026-10-10', status: 'Successful', method: 'Credit Card (Visa)' }
  ]);

  // Modal Control States
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedPlanForPay, setSelectedPlanForPay] = useState(null);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentSuccessReceipt, setPaymentSuccessReceipt] = useState(null);

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedTrainerForBooking, setSelectedTrainerForBooking] = useState(null);
  const [bookingForm, setBookingForm] = useState({ date: '2026-10-20', time: '05:00 PM', notes: '' });

  const [toastMessage, setToastMessage] = useState('');

  // Calculators State
  const [bmiInput, setBmiInput] = useState({ height: 175, weight: 75, age: 26, gender: 'male' });
  const [calorieInput, setCalorieInput] = useState({ height: 175, weight: 75, age: 26, gender: 'male', activity: 1.55, goal: 'lose' });

  // Filter States
  const [exerciseSearch, setExerciseSearch] = useState('');
  const [exerciseCategory, setExerciseCategory] = useState('All');

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('zishan_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('zishan_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('zishan_workouts', JSON.stringify(workoutLogs));
  }, [workoutLogs]);

  useEffect(() => {
    localStorage.setItem('zishan_attendance', JSON.stringify(attendanceLogs));
  }, [attendanceLogs]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Helper handling Payment trigger
  const handleOpenPayment = (plan) => {
    setSelectedPlanForPay(plan);
    setPaymentSuccessReceipt(null);
    setPaymentModalOpen(true);
  };

  const handleSimulatePayment = (method) => {
    setPaymentProcessing(true);
    setTimeout(() => {
      setPaymentProcessing(false);
      const receipt = {
        transactionId: 'TXN-' + Math.floor(100000 + Math.random() * 900000),
        amount: selectedPlanForPay.price,
        item: selectedPlanForPay.name,
        date: new Date().toISOString().split('T')[0],
        method: method,
        status: 'SUCCESSFUL'
      };
      setPaymentSuccessReceipt(receipt);

      // Update User Plan
      setCurrentUser(prev => ({
        ...prev,
        membershipPlan: selectedPlanForPay.name,
        expiryDate: '2027-10-15',
        status: 'Active'
      }));

      // Log Payment
      setPaymentsHistory(prev => [{
        id: receipt.transactionId,
        plan: selectedPlanForPay.name,
        amount: selectedPlanForPay.price,
        date: receipt.date,
        status: 'Successful',
        method: method
      }, ...prev]);

      showToast(`Payment Successful! Enrolled in ${selectedPlanForPay.name}`);
    }, 1800);
  };

  // Helper handling Booking creation
  const handleOpenTrainerBooking = (trainer) => {
    setSelectedTrainerForBooking(trainer);
    setBookingModalOpen(true);
  };

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    const newRef = 'BK-' + Math.floor(1000 + Math.random() * 9000);
    const newBooking = {
      id: newRef,
      trainerName: selectedTrainerForBooking.name,
      service: `1-on-1 ${selectedTrainerForBooking.specialty}`,
      date: bookingForm.date,
      time: bookingForm.time,
      status: 'Confirmed',
      price: selectedTrainerForBooking.price,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setBookings(prev => [newBooking, ...prev]);
    setBookingModalOpen(false);
    showToast(`Session booked with ${selectedTrainerForBooking.name}! Ref: ${newRef}`);
  };

  // Attendance Checkin handler
  const handleCheckIn = () => {
    const today = new Date().toISOString().split('T')[0];
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const exists = attendanceLogs.find(a => a.date === today);
    if (exists) {
      showToast('You have already checked in today!');
      return;
    }
    const newLog = {
      id: 'att-' + (attendanceLogs.length + 1),
      date: today,
      time: timeNow,
      status: 'Present',
      station: 'Main Arena Check-in'
    };
    setAttendanceLogs([newLog, ...attendanceLogs]);
    showToast('Check-in logged successfully! Great job staying consistent.');
  };

  const bmiResult = useMemo(() => {
    const hM = bmiInput.height / 100;
    if (!hM || hM === 0) return { bmi: 0, status: 'Invalid' };
    const score = (bmiInput.weight / (hM * hM)).toFixed(1);
    let label = 'Normal Weight';
    let color = 'text-green-400';
    if (score < 18.5) { label = 'Underweight'; color = 'text-yellow-400'; }
    else if (score >= 25 && score < 29.9) { label = 'Overweight'; color = 'text-amber-500'; }
    else if (score >= 30) { label = 'Obese'; color = 'text-red-500'; }
    return { bmi: score, status: label, color };
  }, [bmiInput]);

  const calorieResult = useMemo(() => {
    let bmr = 10 * calorieInput.weight + 6.25 * calorieInput.height - 5 * calorieInput.age;
    bmr += calorieInput.gender === 'male' ? 5 : -161;
    const tdee = Math.round(bmr * calorieInput.activity);
    let target = tdee;
    if (calorieInput.goal === 'lose') target = tdee - 500;
    if (calorieInput.goal === 'gain') target = tdee + 400;

    const protein = Math.round((target * 0.3) / 4);
    const carbs = Math.round((target * 0.4) / 4);
    const fats = Math.round((target * 0.3) / 9);

    return { tdee, target, protein, carbs, fats };
  }, [calorieInput]);

  const filteredExercises = useMemo(() => {
    return EXERCISES.filter(ex => {
      const matchesSearch = ex.name.toLowerCase().includes(exerciseSearch.toLowerCase()) || ex.desc.toLowerCase().includes(exerciseSearch.toLowerCase());
      const matchesCategory = exerciseCategory === 'All' || ex.category === exerciseCategory;
      return matchesSearch && matchesCategory;
    });
  }, [exerciseSearch, exerciseCategory]);

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white font-sans selection:bg-[#FF5500] selection:text-black">
      {}
      <div className="bg-gradient-to-r from-[#FF5500] to-[#FF8800] text-black text-xs font-bold py-1.5 px-4 text-center tracking-wider uppercase flex items-center justify-center gap-2">
        <Sparkles size={14} />
        <span>Join MD ZISHAN FITNESS Today & Get 20% Off Yearly Membership + Free Trainer Consultation!</span>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 bg-[#121212]/90 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('home')} 
            className="cursor-pointer flex items-center gap-3 group"
          >
            <div className="w-11 h-11 bg-[#FF5500] rounded-xl flex items-center justify-center shadow-lg shadow-[#FF5500]/20 group-hover:scale-105 transition-transform">
              <Dumbbell className="text-black stroke-[2.5]" size={24} />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight block text-white font-mono uppercase">
                MD ZISHAN <span className="text-[#FF5500]">FITNESS</span>
              </span>
              <span className="text-[10px] text-neutral-400 tracking-widest block uppercase font-semibold">
                Train Smart • Live Better
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {[
              { id: 'home', label: 'Home' },
              { id: 'facilities', label: 'Facilities' },
              { id: 'memberships', label: 'Memberships' },
              { id: 'trainers', label: 'Trainers' },
              { id: 'workouts', label: 'Workouts & Exercises' },
              { id: 'diet', label: 'Diet & Calculators' },
              { id: 'classes', label: 'Timetable' },
              { id: 'dashboard', label: 'My Dashboard' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#FF5500] text-black shadow-md shadow-[#FF5500]/20'
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-800/80'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => setActiveTab('admin')}
              className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition ${
                activeTab === 'admin'
                  ? 'border-[#FF5500] text-[#FF5500] bg-[#FF5500]/10'
                  : 'border-neutral-700 text-neutral-300 hover:border-neutral-500 hover:text-white'
              }`}
            >
              <Shield size={16} />
              <span>Admin Panel</span>
            </button>
            <button
              onClick={() => setActiveTab('memberships')}
              className="bg-[#FF5500] hover:bg-[#FF6600] text-black font-bold px-4 py-2 rounded-lg text-xs uppercase tracking-wider transition-all transform active:scale-95 shadow-lg shadow-[#FF5500]/25 flex items-center gap-1.5"
            >
              <Zap size={15} />
              <span>Join Now</span>
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-300 hover:text-white"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#121212] border-b border-neutral-800 px-4 pt-2 pb-6 space-y-2">
            {[
              { id: 'home', label: 'Home' },
              { id: 'facilities', label: 'Facilities' },
              { id: 'memberships', label: 'Memberships' },
              { id: 'trainers', label: 'Trainers' },
              { id: 'workouts', label: 'Workouts & Exercises' },
              { id: 'diet', label: 'Diet & Calculators' },
              { id: 'classes', label: 'Timetable' },
              { id: 'dashboard', label: 'My Dashboard' },
              { id: 'policy', label: 'Support & Policies' },
              { id: 'admin', label: 'Admin Portal' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-wider ${
                  activeTab === tab.id ? 'bg-[#FF5500] text-black' : 'text-neutral-300 hover:bg-neutral-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1E1E1E] border border-[#FF5500] text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <CheckCircle className="text-[#FF5500]" size={20} />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {}
      <main>
        {/* ================= PAGE 1: HOME PAGE ================= */}
        {activeTab === 'home' && (
          <div>
            {/* Hero Section */}
            <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#121212] via-[#0D0D0D] to-[#121212] py-20 px-4">
              <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <img
                  src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=1920"
                  alt="Gym background"
                  className="w-full h-full object-cover filter grayscale contrast-200"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-[#0D0D0D]"></div>
              </div>

              <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
                <div className="inline-flex items-center gap-2 bg-neutral-900/90 border border-[#FF5500]/40 px-4 py-1.5 rounded-full text-xs text-[#FF5500] uppercase tracking-widest font-bold backdrop-blur-sm">
                  <Flame size={16} /> Premium Athletic & Fitness Platform
                </div>

                <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-none font-sans">
                  BUILD YOUR <br className="hidden sm:inline"/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5500] via-[#FF7700] to-white">
                    STRONGEST SELF
                  </span>
                </h1>

                <p className="max-w-2xl mx-auto text-neutral-300 text-base sm:text-lg font-normal leading-relaxed">
                  Welcome to <strong className="text-white">MD ZISHAN FITNESS</strong>. Founded by master coach MD ZISHAN, we combine state-of-the-art iron equipment, customized biomechanics coaching, high-octane group conditioning, and precision nutrition plans.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                  <button
                    onClick={() => setActiveTab('memberships')}
                    className="bg-[#FF5500] hover:bg-[#FF6600] text-black font-extrabold px-8 py-4 rounded-xl text-sm uppercase tracking-wider transition-all transform hover:-translate-y-0.5 shadow-xl shadow-[#FF5500]/30 flex items-center gap-2"
                  >
                    <span>Join Now</span>
                    <ChevronRight size={18} />
                  </button>
                  <button
                    onClick={() => setActiveTab('facilities')}
                    className="bg-neutral-900 border border-neutral-700 hover:border-[#FF5500] text-white font-bold px-8 py-4 rounded-xl text-sm uppercase tracking-wider transition-all hover:bg-neutral-800"
                  >
                    Explore Facilities
                  </button>
                  <button
                    onClick={() => setActiveTab('trainers')}
                    className="bg-neutral-900/80 border border-neutral-700 hover:border-white text-neutral-300 hover:text-white font-bold px-8 py-4 rounded-xl text-sm uppercase tracking-wider transition-all"
                  >
                    Book A Trainer
                  </button>
                </div>

                {/* Gym Stats Counter */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 max-w-4xl mx-auto">
                  {[
                    { label: 'Active Athletes', value: '1,500+' },
                    { label: 'Certified Trainers', value: '12+' },
                    { label: 'Iron & Turf Sq. Ft.', value: '25,000' },
                    { label: 'Client Success Rate', value: '99.4%' }
                  ].map((st, i) => (
                    <div key={i} className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-4 backdrop-blur-sm">
                      <div className="text-2xl sm:text-3xl font-black text-[#FF5500] font-mono">{st.value}</div>
                      <div className="text-xs text-neutral-400 font-semibold uppercase tracking-wider mt-1">{st.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Founder Highlight Banner */}
            <section className="py-20 bg-[#121212] border-y border-neutral-800 px-4">
              <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-[#FF5500] to-orange-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                  <img
                    src="https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&q=80&w=800"
                    alt="Founder MD ZISHAN"
                    className="relative rounded-2xl w-full h-[450px] object-cover shadow-2xl filter contrast-110"
                  />
                  <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md p-4 rounded-xl border border-neutral-700">
                    <p className="text-[#FF5500] text-xs font-bold uppercase">Founder & Head Coach</p>
                    <p className="text-white text-lg font-black uppercase">MD ZISHAN</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="inline-block bg-[#FF5500]/10 text-[#FF5500] font-mono text-xs font-bold px-3 py-1 rounded-md uppercase">
                    Our Founding Vision
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                    "Fitness is not a temporary challenge. It's a daily standard of discipline."
                  </h2>
                  <p className="text-neutral-300 text-sm leading-relaxed">
                    I founded <strong className="text-white">MD ZISHAN FITNESS</strong> to bridge the gap between commercial aesthetic gyms and high-performance strength facilities. Our environment is engineered for individuals who respect hard work, data-driven fitness, and lifelong longevity.
                  </p>
                  <ul className="space-y-3 pt-2">
                    {[
                      'Custom hypertrophy & biomechanics protocols designed for max efficiency.',
                      'No fake promises or crash diets—only real, sustainable body recomposition.',
                      'Comprehensive ecosystem: Lifting, Cardio, Sauna, Cold Plunge, & Fuel Bar.'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-neutral-300">
                        <CheckCircle size={18} className="text-[#FF5500] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4">
                    <button
                      onClick={() => setActiveTab('trainers')}
                      className="bg-[#FF5500] hover:bg-[#FF6600] text-black font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition"
                    >
                      Book 1-on-1 with MD ZISHAN
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Teaser Facility Grid */}
            <section className="py-20 bg-[#0D0D0D] px-4">
              <div className="max-w-7xl mx-auto space-y-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <span className="text-[#FF5500] font-mono text-xs font-bold uppercase tracking-widest">World Class Equipment</span>
                    <h2 className="text-3xl sm:text-4xl font-black uppercase text-white mt-1">Gym Facilities</h2>
                  </div>
                  <button
                    onClick={() => setActiveTab('facilities')}
                    className="text-[#FF5500] hover:text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1"
                  >
                    <span>View All Facilities</span>
                    <ChevronRight size={16} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {FACILITIES.slice(0, 3).map((fac) => (
                    <div key={fac.id} className="bg-[#141414] border border-neutral-800 rounded-2xl overflow-hidden group hover:border-[#FF5500]/50 transition duration-300">
                      <div className="h-52 overflow-hidden relative">
                        <img
                          src={fac.img}
                          alt={fac.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-500 filter contrast-105"
                        />
                        <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-[#FF5500] text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                          {fac.category}
                        </div>
                      </div>
                      <div className="p-6 space-y-2">
                        <h3 className="text-lg font-bold text-white uppercase">{fac.title}</h3>
                        <p className="text-xs text-neutral-400 leading-relaxed">{fac.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Testimonials Slider Preview */}
            <section className="py-20 bg-[#121212] border-t border-neutral-800 px-4">
              <div className="max-w-5xl mx-auto text-center space-y-10">
                <span className="text-[#FF5500] font-mono text-xs font-bold uppercase tracking-widest">Proof of Results</span>
                <h2 className="text-3xl sm:text-4xl font-black uppercase text-white">What Our Athletes Say</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  {[
                    {
                      quote: "Training at MD ZISHAN FITNESS changed my trajectory completely. Dropped 18 kg of body fat while adding serious strength to my deadlift. The atmosphere is unmatched.",
                      name: "David K.",
                      role: "Member since 2024",
                      rating: 5
                    },
                    {
                      quote: "The facility design, high-end barbells, infrared sauna, and recovery plunge make this the best gym experience in the city. MD Zishan’s coaching advice is gold.",
                      name: "Elena R.",
                      role: "Crossfit & HIIT Athlete",
                      rating: 5
                    }
                  ].map((t, idx) => (
                    <div key={idx} className="bg-[#171717] border border-neutral-800 p-6 rounded-2xl space-y-4">
                      <div className="flex gap-1 text-[#FF5500]">
                        {[...Array(t.rating)].map((_, i) => (
                          <Sparkles key={i} size={16} fill="#FF5500" />
                        ))}
                      </div>
                      <p className="text-sm text-neutral-300 italic">"{t.quote}"</p>
                      <div className="pt-2 border-t border-neutral-800 flex justify-between items-center text-xs">
                        <span className="font-bold text-white uppercase">{t.name}</span>
                        <span className="text-neutral-500">{t.role}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ================= PAGE 2: GYM FACILITIES ================= */}
        {activeTab === 'facilities' && (
          <div className="py-12 px-4 max-w-7xl mx-auto space-y-10">
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <span className="text-[#FF5500] font-mono text-xs font-bold uppercase tracking-widest">Uncompromised Quality</span>
              <h1 className="text-4xl font-black uppercase text-white">State-of-the-Art Facilities</h1>
              <p className="text-neutral-400 text-sm">
                Every square foot of MD ZISHAN FITNESS is constructed with precision. From international competition barbells to infrared recovery saunas.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {FACILITIES.map((fac) => (
                <div key={fac.id} className="bg-[#141414] border border-neutral-800 rounded-2xl overflow-hidden hover:border-[#FF5500] transition duration-300 flex flex-col justify-between">
                  <div>
                    <div className="h-60 overflow-hidden relative">
                      <img src={fac.img} alt={fac.title} className="w-full h-full object-cover filter contrast-105" />
                      <span className="absolute top-3 left-3 bg-[#FF5500] text-black font-bold text-xs px-3 py-1 rounded-full uppercase">
                        {fac.category}
                      </span>
                    </div>
                    <div className="p-6 space-y-3">
                      <h3 className="text-xl font-bold text-white uppercase">{fac.title}</h3>
                      <p className="text-xs text-neutral-400 leading-relaxed">{fac.desc}</p>
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    <button
                      onClick={() => {
                        showToast(`Selected facility: ${fac.title}`);
                        setActiveTab('memberships');
                      }}
                      className="w-full bg-neutral-900 border border-neutral-700 hover:border-[#FF5500] hover:text-[#FF5500] text-white py-2.5 rounded-xl text-xs font-bold uppercase transition"
                    >
                      Access With Membership
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= PAGE 3: MEMBERSHIP PLANS ================= */}
        {activeTab === 'memberships' && (
          <div className="py-12 px-4 max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-[#FF5500] font-mono text-xs font-bold uppercase tracking-widest">Simple & Transparent</span>
              <h1 className="text-4xl font-black uppercase text-white">Membership Plans</h1>
              <p className="text-neutral-400 text-sm">
                No hidden setup fees. Upgrade or cancel anytime in accordance with our gym policies.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {membershipsList.map((m) => (
                <div
                  key={m.id}
                  className={`bg-[#141414] border rounded-2xl p-6 flex flex-col justify-between relative transition duration-300 ${
                    m.popular ? 'border-[#FF5500] shadow-2xl shadow-[#FF5500]/10 bg-gradient-to-b from-[#181818] to-[#121212]' : 'border-neutral-800'
                  }`}
                >
                  {m.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#FF5500] text-black font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
                      Most Popular Plan
                    </div>
                  )}

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-white uppercase">{m.name}</h3>
                      <p className="text-xs text-neutral-400 mt-1">{m.billing}</p>
                    </div>

                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-white font-mono">${m.price}</span>
                      <span className="text-xs text-neutral-400 font-bold uppercase">/ {m.duration}</span>
                    </div>

                    <ul className="space-y-3 border-t border-neutral-800 pt-4 text-xs text-neutral-300">
                      {m.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Check size={16} className="text-[#FF5500] shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-8">
                    <button
                      onClick={() => handleOpenPayment(m)}
                      className={`w-full py-3 rounded-xl font-extrabold text-xs uppercase tracking-wider transition ${
                        m.popular
                          ? 'bg-[#FF5500] hover:bg-[#FF6600] text-black shadow-lg shadow-[#FF5500]/20'
                          : 'bg-neutral-800 hover:bg-neutral-700 text-white'
                      }`}
                    >
                      Join Now via Razorpay/UPI
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= PAGE 4: PERSONAL TRAINING ================= */}
        {activeTab === 'trainers' && (
          <div className="py-12 px-4 max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <span className="text-[#FF5500] font-mono text-xs font-bold uppercase tracking-widest">Master Guidance</span>
              <h1 className="text-4xl font-black uppercase text-white">Elite Personal Trainers</h1>
              <p className="text-neutral-400 text-sm">
                Book 1-on-1 private coaching sessions with accredited specialists. Tailored biomechanics and goal tracking.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {trainersList.map((tr) => (
                <div key={tr.id} className="bg-[#141414] border border-neutral-800 rounded-2xl overflow-hidden flex flex-col sm:flex-row hover:border-neutral-700 transition">
                  <img src={tr.image} alt={tr.name} className="w-full sm:w-48 h-64 sm:h-auto object-cover filter contrast-105" />
                  <div className="p-6 flex flex-col justify-between space-y-4 flex-1">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-white uppercase">{tr.name}</h3>
                          <p className="text-xs text-[#FF5500] font-semibold">{tr.role}</p>
                        </div>
                        <span className="bg-neutral-800 text-yellow-400 text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
                          ★ {tr.rating} ({tr.reviews})
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400 line-clamp-3">{tr.bio}</p>
                      <div className="text-xs text-neutral-300 font-mono pt-1">
                        Specialty: <span className="text-neutral-100">{tr.specialty}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-neutral-800 pt-4">
                      <div>
                        <span className="text-2xl font-black text-white font-mono">${tr.price}</span>
                        <span className="text-[10px] text-neutral-400 uppercase font-bold"> / Session</span>
                      </div>
                      <button
                        onClick={() => handleOpenTrainerBooking(tr)}
                        className="bg-[#FF5500] hover:bg-[#FF6600] text-black font-extrabold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider transition"
                      >
                        Book Session
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= PAGE 5: WORKOUT PROGRAMS & EXERCISES ================= */}
        {activeTab === 'workouts' && (
          <div className="py-12 px-4 max-w-7xl mx-auto space-y-10">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-[#FF5500] font-mono text-xs font-bold uppercase tracking-widest">Library & Database</span>
              <h1 className="text-4xl font-black uppercase text-white">Exercise & Program Vault</h1>
              <p className="text-neutral-400 text-sm">
                Explore correct lifting form, movement mechanics, and target muscle groups.
              </p>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-[#141414] p-4 rounded-2xl border border-neutral-800">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-3 text-neutral-500" size={18} />
                <input
                  type="text"
                  placeholder="Search exercise..."
                  value={exerciseSearch}
                  onChange={(e) => setExerciseSearch(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#FF5500]"
                />
              </div>

              <div className="flex flex-wrap gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                {['All', 'Chest', 'Back', 'Shoulders', 'Legs', 'Arms', 'Core', 'HIIT'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setExerciseCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase transition ${
                      exerciseCategory === cat
                        ? 'bg-[#FF5500] text-black'
                        : 'bg-neutral-900 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Exercise Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExercises.map(ex => (
                <div key={ex.id} className="bg-[#141414] border border-neutral-800 rounded-2xl p-6 space-y-4 hover:border-[#FF5500]/50 transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] bg-[#FF5500]/10 text-[#FF5500] font-bold px-2.5 py-1 rounded-md uppercase font-mono">
                        {ex.category}
                      </span>
                      <h3 className="text-lg font-bold text-white uppercase mt-2">{ex.name}</h3>
                    </div>
                    <span className="text-[10px] bg-neutral-800 text-neutral-300 font-bold px-2 py-1 rounded-md">
                      {ex.level}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-400 leading-relaxed">{ex.desc}</p>

                  <div className="grid grid-cols-2 gap-2 text-xs border-t border-neutral-800 pt-4 font-mono">
                    <div>
                      <span className="text-neutral-500 block text-[10px]">PRESCRIBED SETS</span>
                      <span className="text-white font-semibold">{ex.sets}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block text-[10px]">EST. BURN</span>
                      <span className="text-[#FF5500] font-semibold">{ex.calories}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= PAGE 6: DIET & CALCULATORS ================= */}
        {activeTab === 'diet' && (
          <div className="py-12 px-4 max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-[#FF5500] font-mono text-xs font-bold uppercase tracking-widest">Data Driven Fitness</span>
              <h1 className="text-4xl font-black uppercase text-white">Diet & Fitness Calculators</h1>
              <p className="text-neutral-400 text-sm">
                Calculate your Body Mass Index (BMI) and Total Daily Energy Expenditure (TDEE).
              </p>
            </div>

            {/* Medical Disclaimer */}
            <div className="bg-neutral-900 border border-amber-500/30 text-amber-200 text-xs p-4 rounded-xl flex items-start gap-3 max-w-4xl mx-auto">
              <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={18} />
              <p>
                <strong>Important Notice:</strong> BMI and Calorie estimates are intended for general athletic guidance only and do not replace formal medical evaluation or personalized clinical nutrition advice.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* BMI Calculator Widget */}
              <div className="bg-[#141414] border border-neutral-800 p-6 rounded-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                  <h2 className="text-xl font-black uppercase text-white flex items-center gap-2">
                    <Activity size={20} className="text-[#FF5500]" />
                    <span>BMI Calculator</span>
                  </h2>
                  <span className={`text-sm font-bold ${bmiResult.color}`}>{bmiResult.status}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="text-neutral-400 font-bold block mb-1">Height (cm)</label>
                    <input
                      type="number"
                      value={bmiInput.height}
                      onChange={e => setBmiInput({ ...bmiInput, height: Number(e.target.value) })}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-3 text-white focus:outline-none focus:border-[#FF5500]"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-400 font-bold block mb-1">Weight (kg)</label>
                    <input
                      type="number"
                      value={bmiInput.weight}
                      onChange={e => setBmiInput({ ...bmiInput, weight: Number(e.target.value) })}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-3 text-white focus:outline-none focus:border-[#FF5500]"
                    />
                  </div>
                </div>

                <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl text-center space-y-2">
                  <span className="text-xs text-neutral-400 uppercase font-bold">Your Calculated BMI Score</span>
                  <div className="text-5xl font-black text-[#FF5500] font-mono">{bmiResult.bmi}</div>
                  <p className="text-xs text-neutral-400">Optimal Range for Athletes: 18.5 - 24.9</p>
                </div>
              </div>

              {/* TDEE / Calorie Calculator Widget */}
              <div className="bg-[#141414] border border-neutral-800 p-6 rounded-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                  <h2 className="text-xl font-black uppercase text-white flex items-center gap-2">
                    <Flame size={20} className="text-[#FF5500]" />
                    <span>Macro & Calorie Calculator</span>
                  </h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="text-neutral-400 font-bold block mb-1">Age</label>
                    <input
                      type="number"
                      value={calorieInput.age}
                      onChange={e => setCalorieInput({ ...calorieInput, age: Number(e.target.value) })}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-2.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-400 font-bold block mb-1">Goal</label>
                    <select
                      value={calorieInput.goal}
                      onChange={e => setCalorieInput({ ...calorieInput, goal: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-2.5 text-white"
                    >
                      <option value="lose">Fat Loss (-500 kcal)</option>
                      <option value="maintain">Maintain Weight</option>
                      <option value="gain">Muscle Gain (+400 kcal)</option>
                    </select>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="text-neutral-400 font-bold block mb-1">Activity Level</label>
                    <select
                      value={calorieInput.activity}
                      onChange={e => setCalorieInput({ ...calorieInput, activity: Number(e.target.value) })}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-2.5 text-white"
                    >
                      <option value={1.2}>Sedentary</option>
                      <option value={1.375}>Lightly Active</option>
                      <option value={1.55}>Moderate Active</option>
                      <option value={1.725}>Heavy Lifting</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-center pt-2">
                  <div className="bg-neutral-900 p-3 rounded-xl border border-neutral-800">
                    <span className="text-[10px] text-neutral-500 block">DAILY TARGET</span>
                    <span className="text-lg font-bold text-[#FF5500]">{calorieResult.target} kcal</span>
                  </div>
                  <div className="bg-neutral-900 p-3 rounded-xl border border-neutral-800">
                    <span className="text-[10px] text-neutral-500 block">PROTEIN</span>
                    <span className="text-sm font-bold text-white">{calorieResult.protein}g</span>
                  </div>
                  <div className="bg-neutral-900 p-3 rounded-xl border border-neutral-800">
                    <span className="text-[10px] text-neutral-500 block">CARBS</span>
                    <span className="text-sm font-bold text-white">{calorieResult.carbs}g</span>
                  </div>
                  <div className="bg-neutral-900 p-3 rounded-xl border border-neutral-800">
                    <span className="text-[10px] text-neutral-500 block">FATS</span>
                    <span className="text-sm font-bold text-white">{calorieResult.fats}g</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= PAGE 7: CLASS TIMETABLE ================= */}
        {activeTab === 'classes' && (
          <div className="py-12 px-4 max-w-7xl mx-auto space-y-10">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-[#FF5500] font-mono text-xs font-bold uppercase tracking-widest">Schedule</span>
              <h1 className="text-4xl font-black uppercase text-white">Class Timetable</h1>
              <p className="text-neutral-400 text-sm">
                Reserve your spot in high-energy group fitness classes led by certified coaches.
              </p>
            </div>

            <div className="bg-[#141414] border border-neutral-800 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-900 text-neutral-400 uppercase font-mono border-b border-neutral-800">
                    <tr>
                      <th className="p-4">Class Name</th>
                      <th className="p-4">Trainer</th>
                      <th className="p-4">Schedule</th>
                      <th className="p-4">Room Zone</th>
                      <th className="p-4">Open Spots</th>
                      <th className="p-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800 text-neutral-200">
                    {GYM_CLASSES.map(cls => (
                      <tr key={cls.id} className="hover:bg-neutral-900/50 transition">
                        <td className="p-4 font-bold text-white uppercase">{cls.name}</td>
                        <td className="p-4 text-[#FF5500] font-semibold">{cls.trainer}</td>
                        <td className="p-4">{cls.days} ({cls.time})</td>
                        <td className="p-4 text-neutral-400">{cls.room}</td>
                        <td className="p-4 font-mono font-bold text-amber-400">{cls.spots} Spots Left</td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => showToast(`Reserved 1 seat for ${cls.name}!`)}
                            className="bg-[#FF5500] hover:bg-[#FF6600] text-black font-bold px-4 py-1.5 rounded-lg text-xs uppercase"
                          >
                            Reserve Seat
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= PAGE 8: MY CUSTOMER DASHBOARD ================= */}
        {activeTab === 'dashboard' && (
          <div className="py-12 px-4 max-w-7xl mx-auto space-y-10">
            {/* Header User Profile Card */}
            <div className="bg-[#141414] border border-neutral-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#FF5500] rounded-2xl flex items-center justify-center text-black font-black text-2xl font-mono">
                  {currentUser.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-black uppercase text-white">{currentUser.name}</h1>
                    <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/20 uppercase">
                      {currentUser.status} Member
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400">{currentUser.email} • {currentUser.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <button
                  onClick={handleCheckIn}
                  className="flex-1 md:flex-initial bg-[#FF5500] hover:bg-[#FF6600] text-black font-extrabold px-6 py-3 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <CheckCircle size={18} />
                  <span>Log Gym Attendance</span>
                </button>
              </div>
            </div>

            {/* Dashboard Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-[#141414] border border-neutral-800 p-5 rounded-2xl space-y-2">
                <span className="text-[10px] text-neutral-400 uppercase font-bold">Active Membership Plan</span>
                <p className="text-lg font-black text-white">{currentUser.membershipPlan}</p>
                <p className="text-[10px] text-emerald-400">Expires: {currentUser.expiryDate}</p>
              </div>

              <div className="bg-[#141414] border border-neutral-800 p-5 rounded-2xl space-y-2">
                <span className="text-[10px] text-neutral-400 uppercase font-bold">Total Gym Check-ins</span>
                <p className="text-3xl font-black text-[#FF5500] font-mono">{attendanceLogs.length}</p>
                <p className="text-[10px] text-neutral-500">Streak active this week</p>
              </div>

              <div className="bg-[#141414] border border-neutral-800 p-5 rounded-2xl space-y-2">
                <span className="text-[10px] text-neutral-400 uppercase font-bold">Booked Sessions</span>
                <p className="text-3xl font-black text-white font-mono">{bookings.length}</p>
                <p className="text-[10px] text-neutral-500">Personal coaching sessions</p>
              </div>

              <div className="bg-[#141414] border border-neutral-800 p-5 rounded-2xl space-y-2">
                <span className="text-[10px] text-neutral-400 uppercase font-bold">Logged Workouts</span>
                <p className="text-3xl font-black text-white font-mono">{workoutLogs.length}</p>
                <p className="text-[10px] text-neutral-500">Lifting sets registered</p>
              </div>
            </div>

            {/* Grid Split: Bookings & Workouts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Bookings List */}
              <div className="bg-[#141414] border border-neutral-800 p-6 rounded-2xl space-y-4">
                <h3 className="text-lg font-bold text-white uppercase flex items-center gap-2">
                  <Calendar size={18} className="text-[#FF5500]" />
                  <span>My Coaching Appointments</span>
                </h3>

                <div className="space-y-3">
                  {bookings.map((b) => (
                    <div key={b.id} className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[10px] text-neutral-500 font-mono">{b.id}</span>
                        <h4 className="font-bold text-white uppercase">{b.service}</h4>
                        <p className="text-neutral-400">Coach: {b.trainerName}</p>
                        <p className="text-neutral-500">{b.date} at {b.time}</p>
                      </div>
                      <span className="bg-emerald-500/10 text-emerald-400 font-bold px-3 py-1 rounded-md">
                        {b.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Workout History */}
              <div className="bg-[#141414] border border-neutral-800 p-6 rounded-2xl space-y-4">
                <h3 className="text-lg font-bold text-white uppercase flex items-center gap-2">
                  <Dumbbell size={18} className="text-[#FF5500]" />
                  <span>Workout Logs</span>
                </h3>

                <div className="space-y-3">
                  {workoutLogs.map((w) => (
                    <div key={w.id} className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl flex items-center justify-between text-xs">
                      <div>
                        <h4 className="font-bold text-white uppercase">{w.exercise}</h4>
                        <p className="text-neutral-400">{w.sets} Sets x {w.reps} Reps</p>
                        <p className="text-neutral-500">{w.date}</p>
                      </div>
                      <span className="text-base font-black text-[#FF5500] font-mono">
                        {w.weight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= PAGE 9: ADMIN PANEL ================= */}
        {activeTab === 'admin' && (
          <div className="py-12 px-4 max-w-7xl mx-auto space-y-10">
            {!isAdminLoggedIn ? (
              /* Admin Lock Screen */
              <div className="max-w-md mx-auto bg-[#141414] border border-neutral-800 p-8 rounded-2xl space-y-6 text-center">
                <div className="w-16 h-16 bg-[#FF5500]/10 text-[#FF5500] rounded-2xl flex items-center justify-center mx-auto">
                  <Shield size={32} />
                </div>
                <div>
                  <h1 className="text-2xl font-black uppercase text-white">Admin Portal Access</h1>
                  <p className="text-xs text-neutral-400 mt-1">Authorized Gym Administrator Passcode Required</p>
                </div>

                <div className="space-y-4 text-left">
                  <div>
                    <label className="text-neutral-400 text-xs font-bold block mb-1">Enter Passcode (Default: admin123)</label>
                    <input
                      type="password"
                      value={adminPasscode}
                      onChange={e => setAdminPasscode(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-[#FF5500]"
                    />
                  </div>

                  {adminAuthError && (
                    <p className="text-red-500 text-xs font-bold">{adminAuthError}</p>
                  )}

                  <button
                    onClick={() => {
                      if (adminPasscode === 'admin123' || adminPasscode === 'admin') {
                        setIsAdminLoggedIn(true);
                        setAdminAuthError('');
                        showToast('Logged in as Authorized Admin!');
                      } else {
                        setAdminAuthError('Invalid administrator passcode. Hint: admin123');
                      }
                    }}
                    className="w-full bg-[#FF5500] hover:bg-[#FF6600] text-black font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider"
                  >
                    Authenticate Admin
                  </button>
                </div>
              </div>
            ) : (
              /* Authenticated Admin Control Panel */
              <div className="space-y-10">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#141414] p-6 rounded-2xl border border-neutral-800">
                  <div>
                    <h1 className="text-2xl font-black uppercase text-white flex items-center gap-2">
                      <Shield className="text-[#FF5500]" size={24} />
                      <span>Admin Management Console</span>
                    </h1>
                    <p className="text-xs text-neutral-400">MD ZISHAN FITNESS Operational Control & Financial Logs</p>
                  </div>
                  <button
                    onClick={() => setIsAdminLoggedIn(false)}
                    className="bg-neutral-800 hover:bg-neutral-700 text-white font-bold px-4 py-2 rounded-xl text-xs uppercase"
                  >
                    Exit Admin
                  </button>
                </div>

                {/* KPI Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-[#141414] border border-neutral-800 p-5 rounded-2xl">
                    <span className="text-[10px] text-neutral-400 uppercase font-bold">Total Revenue</span>
                    <p className="text-3xl font-black text-emerald-400 font-mono mt-1">$48,290</p>
                  </div>
                  <div className="bg-[#141414] border border-neutral-800 p-5 rounded-2xl">
                    <span className="text-[10px] text-neutral-400 uppercase font-bold">Active Members</span>
                    <p className="text-3xl font-black text-[#FF5500] font-mono mt-1">1,542</p>
                  </div>
                  <div className="bg-[#141414] border border-neutral-800 p-5 rounded-2xl">
                    <span className="text-[10px] text-neutral-400 uppercase font-bold">Daily Check-ins</span>
                    <p className="text-3xl font-black text-white font-mono mt-1">312</p>
                  </div>
                  <div className="bg-[#141414] border border-neutral-800 p-5 rounded-2xl">
                    <span className="text-[10px] text-neutral-400 uppercase font-bold">Trainer Bookings</span>
                    <p className="text-3xl font-black text-white font-mono mt-1">{bookings.length}</p>
                  </div>
                </div>

                {/* Admin Payments Table */}
                <div className="bg-[#141414] border border-neutral-800 p-6 rounded-2xl space-y-4">
                  <h3 className="text-lg font-bold text-white uppercase">Financial Transactions & Razorpay Logs</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-neutral-900 text-neutral-400 uppercase font-mono">
                        <tr>
                          <th className="p-3">Txn ID</th>
                          <th className="p-3">Plan / Item</th>
                          <th className="p-3">Amount</th>
                          <th className="p-3">Date</th>
                          <th className="p-3">Method</th>
                          <th className="p-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-800 text-neutral-300">
                        {paymentsHistory.map(p => (
                          <tr key={p.id}>
                            <td className="p-3 font-mono text-[#FF5500]">{p.id}</td>
                            <td className="p-3 font-bold text-white">{p.plan}</td>
                            <td className="p-3 font-mono font-bold">${p.amount}</td>
                            <td className="p-3">{p.date}</td>
                            <td className="p-3">{p.method}</td>
                            <td className="p-3">
                              <span className="bg-emerald-500/10 text-emerald-400 font-bold px-2 py-0.5 rounded">
                                {p.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= PAGE 10: POLICIES & SUPPORT ================= */}
        {activeTab === 'policy' && (
          <div className="py-12 px-4 max-w-5xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <span className="text-[#FF5500] font-mono text-xs font-bold uppercase tracking-widest">Transparency</span>
              <h1 className="text-4xl font-black uppercase text-white">Policies & Support Hub</h1>
            </div>

            <div className="bg-[#141414] border border-neutral-800 rounded-2xl p-8 space-y-8 text-xs text-neutral-300 leading-relaxed">
              <section className="space-y-2">
                <h2 className="text-lg font-bold text-white uppercase">Privacy Policy</h2>
                <p>
                  At MD ZISHAN FITNESS, client confidentiality is paramount. Personal identification details, payment records, and health telemetry data collected during enrollment are encrypted and never disclosed to third parties without consent.
                </p>
              </section>

              <section className="space-y-2 border-t border-neutral-800 pt-6">
                <h2 className="text-lg font-bold text-white uppercase">Refund & Cancellation Policy</h2>
                <p>
                  Memberships may be cancelled within 7 days of initial enrollment for a full refund minus processing fees. Personal coaching sessions require at least 24 hours advance notice for rescheduling without penalty.
                </p>
              </section>

              <section className="space-y-2 border-t border-neutral-800 pt-6">
                <h2 className="text-lg font-bold text-white uppercase">Terms & Conditions</h2>
                <p>
                  All athletes must respect gym decorum, re-rack weights, use collars on barbells, and wipedown equipment post-set. Facility management reserves the right to suspend accounts for unsanitary or unsafe behaviors.
                </p>
              </section>
            </div>
          </div>
        )}
      </main>

      {}
      {/* 1. Payment Gateway Simulator Modal */}
      {paymentModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141414] border border-neutral-800 max-w-md w-full rounded-2xl p-6 space-y-6 relative">
            <button
              onClick={() => setPaymentModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-500 hover:text-white"
            >
              <X size={20} />
            </button>

            {!paymentSuccessReceipt ? (
              <div className="space-y-6">
                <div className="border-b border-neutral-800 pb-4">
                  <span className="text-[#FF5500] text-[10px] font-bold uppercase tracking-widest">Test Mode Razorpay / UPI</span>
                  <h2 className="text-xl font-black uppercase text-white mt-1">Complete Subscription</h2>
                </div>

                <div className="bg-neutral-900 p-4 rounded-xl space-y-1">
                  <span className="text-xs text-neutral-400 block">SELECTED PLAN</span>
                  <p className="text-base font-bold text-white uppercase">{selectedPlanForPay?.name}</p>
                  <p className="text-2xl font-black text-[#FF5500] font-mono">${selectedPlanForPay?.price}</p>
                </div>

                <div className="space-y-3">
                  <span className="text-xs text-neutral-400 font-bold block">SELECT PAYMENT METHOD</span>
                  
                  <button
                    disabled={paymentProcessing}
                    onClick={() => handleSimulatePayment('UPI / Google Pay')}
                    className="w-full bg-neutral-900 border border-neutral-700 hover:border-[#FF5500] text-white py-3 rounded-xl text-xs font-bold uppercase flex items-center justify-center gap-2 transition"
                  >
                    <Zap size={16} className="text-[#FF5500]" />
                    <span>Pay with UPI (GPay / PhonePe)</span>
                  </button>

                  <button
                    disabled={paymentProcessing}
                    onClick={() => handleSimulatePayment('Credit/Debit Card')}
                    className="w-full bg-neutral-900 border border-neutral-700 hover:border-[#FF5500] text-white py-3 rounded-xl text-xs font-bold uppercase flex items-center justify-center gap-2 transition"
                  >
                    <CreditCard size={16} className="text-[#FF5500]" />
                    <span>Pay with Card (Visa / Mastercard)</span>
                  </button>
                </div>

                {paymentProcessing && (
                  <div className="text-center text-xs text-[#FF5500] font-bold animate-pulse">
                    Processing transaction securely...
                  </div>
                )}
              </div>
            ) : (
              /* Payment Success Receipt */
              <div className="space-y-6 text-center">
                <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle size={32} />
                </div>
                <div>
                  <h2 className="text-xl font-black uppercase text-white">Payment Successful!</h2>
                  <p className="text-xs text-neutral-400 mt-1">Receipt reference generated below</p>
                </div>

                <div className="bg-neutral-900 p-4 rounded-xl text-left text-xs space-y-2 font-mono">
                  <div className="flex justify-between text-neutral-400">
                    <span>Transaction ID:</span>
                    <span className="text-white font-bold">{paymentSuccessReceipt.transactionId}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Amount Paid:</span>
                    <span className="text-[#FF5500] font-bold">${paymentSuccessReceipt.amount}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Plan Enrolled:</span>
                    <span className="text-white font-bold">{paymentSuccessReceipt.item}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setPaymentModalOpen(false);
                    setActiveTab('dashboard');
                  }}
                  className="w-full bg-[#FF5500] hover:bg-[#FF6600] text-black font-extrabold py-3 rounded-xl text-xs uppercase"
                >
                  Go To My Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. Trainer Session Booking Modal */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141414] border border-neutral-800 max-w-md w-full rounded-2xl p-6 space-y-6 relative">
            <button
              onClick={() => setBookingModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-500 hover:text-white"
            >
              <X size={20} />
            </button>

            <div className="border-b border-neutral-800 pb-4">
              <span className="text-[#FF5500] text-[10px] font-bold uppercase tracking-widest">Private Coaching</span>
              <h2 className="text-xl font-black uppercase text-white mt-1">Book Session with {selectedTrainerForBooking?.name}</h2>
            </div>

            <form onSubmit={handleSubmitBooking} className="space-y-4 text-xs">
              <div>
                <label className="text-neutral-400 font-bold block mb-1">Select Session Date</label>
                <input
                  type="date"
                  value={bookingForm.date}
                  onChange={e => setBookingForm({ ...bookingForm, date: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-3 text-white focus:outline-none focus:border-[#FF5500]"
                />
              </div>

              <div>
                <label className="text-neutral-400 font-bold block mb-1">Select Available Time Slot</label>
                <select
                  value={bookingForm.time}
                  onChange={e => setBookingForm({ ...bookingForm, time: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl p-3 text-white focus:outline-none focus:border-[#FF5500]"
                >
                  {selectedTrainerForBooking?.slots.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#FF5500] hover:bg-[#FF6600] text-black font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-wider"
                >
                  Confirm Booking (${selectedTrainerForBooking?.price})
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {}
      <footer className="bg-[#0A0A0A] border-t border-neutral-800 text-neutral-400 text-xs py-12 px-4 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#FF5500] rounded-lg flex items-center justify-center text-black font-bold">
                <Dumbbell size={18} />
              </div>
              <span className="text-base font-black text-white font-mono uppercase">
                MD ZISHAN <span className="text-[#FF5500]">FITNESS</span>
              </span>
            </div>
            <p className="text-neutral-500 leading-relaxed">
              Train Smart. Stay Strong. Live Better. Precision strength, hypertrophy, and conditioning platform.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase mb-3">Quick Navigation</h4>
            <ul className="space-y-2">
              {['Home', 'Facilities', 'Memberships', 'Trainers', 'Workouts'].map(item => (
                <li key={item}>
                  <button
                    onClick={() => setActiveTab(item.toLowerCase())}
                    className="hover:text-[#FF5500] transition"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase mb-3">Gym Opening Hours</h4>
            <ul className="space-y-1 text-neutral-500 font-mono">
              <li>Mon - Fri: 05:00 AM - 11:00 PM</li>
              <li>Saturday: 06:00 AM - 10:00 PM</li>
              <li>Sunday: 07:00 AM - 08:00 PM</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase mb-3">Contact HQ</h4>
            <p className="text-neutral-500">100 Iron Vault Blvd, Suite 400</p>
            <p className="text-neutral-500">Phone: +1 (800) 555-ZISHAN</p>
            <p className="text-neutral-500">Email: support@zishanfitness.com</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-neutral-900 mt-10 pt-6 text-center text-neutral-600 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} MD ZISHAN FITNESS. All rights reserved.</p>
          <p className="font-bold text-neutral-400 uppercase tracking-widest text-[11px]">
            Founded by <span className="text-[#FF5500]">MD ZISHAN</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
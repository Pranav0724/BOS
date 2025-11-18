import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Colors } from '@/constants/colors';
import { useRouter } from 'expo-router';
import { Mail, Smartphone, NotebookTabs, Lock, User } from 'lucide-react-native';

export default function AuthScreen() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    aadhaar: '',
    phone: '',
  });

  const [error, setError] = useState('');

  const handleAuth = async () => {
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!formData.email || !formData.password) {
      setError("Please fill in email & password");
      return;
    }

    if (!isValidEmail(formData.email)) {
      setError("Please enter a valid email");
      return;
    }

    // Signup-only validations
    if (!isLogin) {
      if (formData.username.length < 3) {
        setError("Full name is required");
        return;
      }

      if (formData.aadhaar.length !== 12) {
        setError("Aadhaar must be 12 digits");
        return;
      }

      if (formData.phone.length !== 10) {
        setError("Phone number must be 10 digits");
        return;
      }
    }

    try {
      setLoading(true);
      setError("");

      const serverURL = process.env.EXPO_PUBLIC_API_URL;

      const apiUrl = isLogin
        ? `${serverURL}/user/login`
        : `${serverURL}/user/register`;

      const body = JSON.stringify(
        isLogin
          ? {
              email: formData.email,
              password: formData.password,
            }
          : {
              email: formData.email,
              password: formData.password,
              username: formData.username,
              aadhaar: formData.aadhaar,
              phone: formData.phone,
            }
      );

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Authentication error");
      }

      alert(isLogin ? "Logged in successfully!" : "Account created successfully!");

      router.back();
    } catch (err) {
      setError("Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          
          <View style={styles.logoContainer}>
            <Image source={require('@/assets/images/bos_logo.png')} resizeMode="contain" />
          </View>

          <Text style={styles.title}>
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </Text>

          <Text style={styles.subtitle}>
            {isLogin ? 'Login to continue' : 'Register to get started'}
          </Text>

          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <View style={styles.form}>
            {/* SIGNUP FIELDS */}
            {!isLogin && (
              <>
                <View style={styles.inputContainer}>
                  <User size={20} color="#9CA3AF" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    placeholderTextColor="#9CA3AF"
                    value={formData.username}
                    onChangeText={(text) => setFormData({ ...formData, username: text })}
                    autoCapitalize="words"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <NotebookTabs size={20} color="#9CA3AF" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Aadhaar Number"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="number-pad"
                    maxLength={12}
                    value={formData.aadhaar}
                    onChangeText={(text) => setFormData({ ...formData, aadhaar: text })}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Smartphone size={20} color="#9CA3AF" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="phone-pad"
                    maxLength={10}
                    value={formData.phone}
                    onChangeText={(text) => setFormData({ ...formData, phone: text })}
                  />
                </View>
              </>
            )}

            {/* Email */}
            <View style={styles.inputContainer}>
              <Mail size={20} color="#9CA3AF" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#9CA3AF"
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            {/* Password */}
            <View style={styles.inputContainer}>
              <Lock size={20} color="#9CA3AF" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                value={formData.password}
                onChangeText={(text) => setFormData({ ...formData, password: text })}
                keyboardType= "visible-password"
              />
            </View>

            {/* Button */}
            <TouchableOpacity
              style={[styles.authButton, loading && styles.authButtonDisabled]}
              onPress={handleAuth}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.authButtonText}>
                  {isLogin ? 'Login' : 'Sign Up'}
                </Text>
              )}
            </TouchableOpacity>

            {/* Toggle */}
            <TouchableOpacity
              style={styles.switchButton}
              onPress={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
            >
              <Text style={styles.switchButtonText}>
                {isLogin
                  ? "Don't have an account? Sign Up"
                  : 'Already have an account? Login'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <Text style={styles.backButtonText}>Back to Home</Text>
            </TouchableOpacity>

          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  keyboardView: { flex: 1 },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: 20 },
  logoContainer: { alignItems: 'center', marginBottom: 32 },
  title: { fontSize: 28, fontWeight: '700', color: '#1F2937', textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#6B7280', textAlign: 'center', marginBottom: 32 },
  errorContainer: { backgroundColor: '#FEE2E2', padding: 12, borderRadius: 8, marginBottom: 16 },
  errorText: { color: '#DC2626', fontSize: 14, textAlign: 'center' },
  form: { marginTop: 10, gap: 6 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB'
  },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, paddingVertical: 16, fontSize: 16, color: '#1F2937' },
  authButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8
  },
  authButtonDisabled: { backgroundColor: '#9CA3AF' },
  authButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  switchButton: { alignItems: 'center', paddingVertical: 12 },
  switchButtonText: { color: Colors.primary, fontSize: 14, fontWeight: '600' },
  backButton: { alignItems: 'center', paddingVertical: 12 },
  backButtonText: { color: '#6B7280', fontSize: 14 },
});

import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import { Colors } from '@/constants/colors';
import { categories, mockListings } from '@/constants/data';
import SearchBar from '@/components/SearchBar';
import CategoryCard from '@/components/CategoryCard';
import ListingCard from '@/components/ListingCard';
import { Star } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
   const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');

  const handleCategoryPress = (categoryName: string) => {
    console.log('Category pressed:', categoryName);
  };

  const handleListingPress = (listingId: string) => {
    console.log('Listing pressed:', listingId);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.logoContainer}>
              <Image
                source={require('@/assets/images/bos_logo.png')}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>
            <TouchableOpacity style={styles.authButton} activeOpacity={0.8}>
              <Text style={styles.authButtonText}onPress={() => router.push('/auth' as any)}>Sign in/Login</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.headerTitle}>What are you looking for</Text>

          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFilterPress={() => console.log('Filter pressed')}
          />
        </View>

        <View style={styles.categoriesSection}>
          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onPress={() => handleCategoryPress(category.name)}
              />
            ))}
          </View>
        </View>

        <View style={styles.recommendationsSection}>
          <View style={styles.sectionHeader}>
            <Star
              color={Colors.primary}
              size={20}
              strokeWidth={2}
              fill={Colors.primary}
            />
            <Text style={styles.sectionTitle}>Dynamic Recommendations</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.recommendationsScroll}
          >
            {mockListings.slice(0, 2).map((listing) => (
              <View key={listing.id} style={styles.recommendationCard}>
                <ListingCard
                  listing={listing}
                  onPress={() => handleListingPress(listing.id)}
                />
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Recent Listings</Text>
          <View style={styles.listingsGrid}>
            {mockListings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                onPress={() => handleListingPress(listing.id)}
              />
            ))}
          </View>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 120,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 24,
    backgroundColor: Colors.background,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoContainer: {
    width: 60,
    height: 60,
  },
  logoImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  logoCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#8B6914',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#D4AF37',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  logoText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  authButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.white,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  authButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: 16,
    letterSpacing: 0.3,
  },
  categoriesSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  recommendationsSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text.primary,
    letterSpacing: 0.3,
  },
  recommendationsScroll: {
    paddingHorizontal: 20,
    gap: 12,
  },
  recommendationCard: {
    marginRight: 4,
  },
  recentSection: {
    paddingHorizontal: 20,
  },
  listingsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  bottomSpacer: {
    height: 20,
  },
});

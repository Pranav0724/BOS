import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Colors } from '@/constants/colors';
import { categories, mockListings } from '@/constants/data';
import SearchBar from '@/components/SearchBar';
import ListingCard from '@/components/ListingCard';

export default function CategoriesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredListings = mockListings.filter((listing) => {
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? listing.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const handleListingPress = (listingId: string) => {
    console.log('Listing pressed:', listingId);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Categories</Text>
          <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryTabs}
          style={styles.categoryTabsContainer}>
          <TouchableOpacity
            style={[styles.categoryTab, !selectedCategory && styles.categoryTabActive]}
            onPress={() => setSelectedCategory(null)}
            activeOpacity={0.8}>
            <Text style={[styles.categoryTabText, !selectedCategory && styles.categoryTabTextActive]}>
              All
            </Text>
          </TouchableOpacity>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryTab,
                selectedCategory === category.name && styles.categoryTabActive,
              ]}
              onPress={() => setSelectedCategory(category.name)}
              activeOpacity={0.8}>
              <Text
                style={[
                  styles.categoryTabText,
                  selectedCategory === category.name && styles.categoryTabTextActive,
                ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}>
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsCount}>
              {filteredListings.length} {filteredListings.length === 1 ? 'result' : 'results'}
            </Text>
          </View>

          {filteredListings.length > 0 ? (
            <View style={styles.listingsGrid}>
              {filteredListings.map((listing) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  onPress={() => handleListingPress(listing.id)}
                />
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateTitle}>No listings found</Text>
              <Text style={styles.emptyStateText}>
                Try adjusting your search or category filter
              </Text>
            </View>
          )}

          <View style={styles.bottomSpacer} />
        </ScrollView>
      </View>
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
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.text.primary,
    marginBottom: 16,
    letterSpacing: 0.3,
  },
  categoryTabsContainer: {
    maxHeight: 60,
    backgroundColor: Colors.background,
  },
  categoryTabs: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 12,
  },
  categoryTab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  categoryTabActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.secondary,
  },
  categoryTabTextActive: {
    color: Colors.white,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 120,
  },
  resultsHeader: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  resultsCount: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.secondary,
  },
  listingsGrid: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 15,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  bottomSpacer: {
    height: 20,
  },
});

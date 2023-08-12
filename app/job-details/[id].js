import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import useFetch from "../../hooks/useFetchhook";
const tabs = ["About", "Qualification", "Responsibilities"];
const Jobdetails = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [refreshing, setRefreshing] = useState(false);
  const params = useSearchParams();
  const router = useRouter();
  const onrefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, []);
  const { data, loading, error, refetch } = useFetch("job-details", {
    job_id: params.id,
  });
  const displaytab = () => {
    switch (activeTab) {
      case "Qualification":
        return (
          <Specifics
            title="Qualification"
            points={data[0].job_highlights?.Qualifications ?? ["No data found"]}
          />
        );
      case "About":
        return <JobAbout info={data[0].job_description ?? "No data found"} />;
      case "Responsibilities":
        return (
          <Specifics
            title="Responsibilities"
            points={data[0].job_highlights?.Responsibilities ?? ["NA"]}
          />
        );
      default:
        break;
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerBackVisible: false,
          headerStyle: {
            backgroundColor: COLORS.lightWhite,
          },
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />
          ),
          headerTitle: "",
        }}
      />
      <>
        <ScrollView showsVerticalScrollIndicator={false}>
          {<RefreshControl refreshing={refreshing} onRefresh={onrefresh} />}
          {loading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong </Text>
          ) : data.length === 0 ? (
            <Text>No data found</Text>
          ) : (
            <View>
              <Company
                companyLogo={data[0].employer_logo}
                jobTitle={data[0].job_title}
                companyName={data[0].employer_name}
                location={data[0].job_country}
              />
              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              {displaytab()}
            </View>
          )}
        </ScrollView>
        <JobFooter
          url={
            data[0]?.job_google_link ??
            "https://careers.google.com/jobs/results/"
          }
        />
      </>
    </SafeAreaView>
  );
};

export default Jobdetails;

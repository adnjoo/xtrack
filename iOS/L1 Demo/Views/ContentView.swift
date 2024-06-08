//
//  ContentView.swift
//  L1 Demo
//
//  Created by Andrew Njoo on 6/7/24.
//

import SwiftUI
import Supabase

struct Country: Decodable {
    let id: Int
    let name: String
}

struct ContentView: View {
    @State private var countries: [Country] = []
    @State private var isLoading = false // Add a state variable to track loading state

    var body: some View {
        ZStack {
            Color(.black).ignoresSafeArea()

            VStack {

                if isLoading {
                    ProgressView() // Show a loading indicator while data is being fetched
                        .progressViewStyle(CircularProgressViewStyle())
                        .foregroundColor(.white)
                } else {
                    List(countries, id: \.id) { country in
                        Text(country.name)
                    }
                    .foregroundColor(.black)
                }
            }
        }
        .onAppear {
            fetchCountries()
        }
    }

    func fetchCountries() {
        isLoading = true // Set loading state to true when starting to fetch data


        let supabase = SupabaseClient(supabaseURL: URL(string: ProcessInfo.processInfo.environment["supabaseURL"]!)!, supabaseKey: ProcessInfo.processInfo.environment["supabaseKey"]!)

        Task {
            do {
                let fetchedCountries: [Country] = try await supabase
                    .from("countries")
                    .select()
                    .execute()
                    .value ?? []
                countries = fetchedCountries

            } catch {
                print("error: \(error)")
            }
            
            isLoading = false // Set loading state to false after data is fetched
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}

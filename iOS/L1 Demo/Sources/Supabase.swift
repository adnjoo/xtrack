//
//  Supabase.swift
//  L1 Demo
//
//  Created by Andrew Njoo on 6/7/24.
//

import SwiftUI
import Foundation

struct Supabase: View {
    let hello = "Hello, SwiftUI!"
    let url = ProcessInfo.processInfo.environment["supabaseURL"]
    let anonKey = ProcessInfo.processInfo.environment["supabaseKey"]

    var body: some View {
        Text("Hello Swift")
            .onAppear {
                print("Hello World")
                print(url ?? "no url found")  // Print the value of the hello variable
                print(anonKey ?? "no anon key found")
            }
    }
}

#Preview {
    Supabase()
}

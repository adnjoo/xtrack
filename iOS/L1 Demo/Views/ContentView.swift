//
//  ContentView.swift
//  L1 Demo
//
//  Created by Andrew Njoo on 6/7/24.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        ZStack {
            Color(.black).ignoresSafeArea()
            
            VStack {
                TitleText(text: "L1 Demo")

                Image("surf")
                    .resizable()
                    .cornerRadius(10)
                    .aspectRatio(contentMode: .fit)
                    .padding(.all)
                TitleText(text: "Surf and turf")

            }
            
        }
    }
}

#Preview {
    ContentView()
}

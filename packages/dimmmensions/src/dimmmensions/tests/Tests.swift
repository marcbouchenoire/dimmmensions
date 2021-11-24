//
//  Tests.swift
//
//  Created by Marc Bouchenoire.
//

import XCTest
import UIKit

class Tests: XCTestCase {
    override func setUpWithError() throws {
        continueAfterFailure = false
    }
    
    func test() throws {
        let app = XCUIApplication()
        app.launch()
        
        func addDimensionsFromOrientation(_ orientation: UIDeviceOrientation) {
            XCUIDevice.shared.orientation = orientation
            
            let dimensions = app.otherElements["dimensions"].label
            let attachment = XCTAttachment(string: dimensions)
            attachment.lifetime = .keepAlways
            attachment.name = "dimensions"
            
            add(attachment)
        }
        
        addDimensionsFromOrientation(.portrait)
        addDimensionsFromOrientation(.landscapeLeft)
    }
}

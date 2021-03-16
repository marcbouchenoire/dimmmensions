//
//  Tests.swift
//
//  Created by Marc Bouchenoire.
//

import XCTest

struct Dimensions: Codable {
    var device: String
    var orientation: String
    var scale: CGFloat
    var screen: Screen
    var sizeClass: SizeClasses
    var safeArea: Frame
    var layoutMargins: Frame
    var readableContent: Frame
}

struct Screen: Codable {
    var width: CGFloat
    var height: CGFloat
}

struct SizeClasses: Codable {
    var horizontal: String
    var vertical: String
}

struct Frame: Codable {
    var top: CGFloat
    var right: CGFloat
    var bottom: CGFloat
    var left: CGFloat
}

func getOrientation(_ orientation: UIInterfaceOrientation) -> String {
    return orientation.isLandscape ? "landscape" : "portrait"
}

func getSizeClass(_ sizeClass: UIUserInterfaceSizeClass) -> String {
    switch sizeClass {
    case .compact:
        return "compact"
    case .regular:
        return "regular"
    default:
        return "unspecified"
    }
}

func getFrame(_ layoutGuide: UILayoutGuide, _ screen: Screen) -> Frame {
    return Frame(top: layoutGuide.layoutFrame.minY, right: screen.width - layoutGuide.layoutFrame.maxX, bottom: screen.height - layoutGuide.layoutFrame.maxY, left: layoutGuide.layoutFrame.minX)
}

class Tests: XCTestCase {
    override func setUpWithError() throws {
        continueAfterFailure = false
    }
    
    func test() throws {
        let app = XCUIApplication()
        app.launch()

        let window = UIWindow()
        let windowScene = window.windowScene!
        
        let device = UIDevice().model
        let orientation = getOrientation(windowScene.interfaceOrientation)
        let scale = windowScene.screen.scale
        let screen = Screen(width: windowScene.screen.bounds.width, height: windowScene.screen.bounds.height)
        let sizeClass = SizeClasses(horizontal: getSizeClass(windowScene.traitCollection.horizontalSizeClass), vertical: getSizeClass(windowScene.traitCollection.verticalSizeClass))
        let safeArea = getFrame(window.safeAreaLayoutGuide, screen)
        let layoutMargins = getFrame(window.layoutMarginsGuide, screen)
        let readableContent = getFrame(window.readableContentGuide, screen)
        
        let dimensions = try! JSONEncoder().encode(Dimensions(device: device, orientation: orientation, scale: scale, screen: screen, sizeClass: sizeClass, safeArea: safeArea, layoutMargins: layoutMargins, readableContent: readableContent))
        let output = String(data: dimensions, encoding: String.Encoding.utf8)
        
        if let output = output {
            let attachment = XCTAttachment(string: "\(output)")
            attachment.lifetime = .keepAlways
            attachment.name = "\(device)-\(abs(output.hash))"
            
            add(attachment)
        }
    }
}

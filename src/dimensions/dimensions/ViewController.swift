//
//  ViewController.swift
//
//  Created by Marc Bouchenoire.
//

import UIKit

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

class ViewController: UIViewController {
    override func viewLayoutMarginsDidChange() {
        super.viewLayoutMarginsDidChange()
        
        let window = UIApplication.shared.windows[0]
        let windowScene = window.windowScene!
        let device = UIDevice.current
        
        let orientation = getOrientation(windowScene.interfaceOrientation)
        let scale = windowScene.screen.scale
        let screen = Screen(width: windowScene.screen.bounds.width, height: windowScene.screen.bounds.height)
        let sizeClass = SizeClasses(horizontal: getSizeClass(windowScene.traitCollection.horizontalSizeClass), vertical: getSizeClass(windowScene.traitCollection.verticalSizeClass))
        let safeArea = getFrame(window.safeAreaLayoutGuide, screen)
        let layoutMargins = getFrame(window.layoutMarginsGuide, screen)
        let readableContent = getFrame(window.readableContentGuide, screen)
        
        let dimensions = try! JSONEncoder().encode(Dimensions(device: device.model, orientation: orientation, scale: scale, screen: screen, sizeClass: sizeClass, safeArea: safeArea, layoutMargins: layoutMargins, readableContent: readableContent))
        
        self.view.accessibilityIdentifier = "dimensions"
        self.view.accessibilityLabel = String(data: dimensions, encoding: String.Encoding.utf8)
    }
}

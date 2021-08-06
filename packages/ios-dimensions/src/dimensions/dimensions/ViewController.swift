//
//  ViewController.swift
//
//  Created by Marc Bouchenoire.
//

import UIKit
import ScreenCorners

struct Dimensions: Codable {
    var device: String
    var orientation: String
    var scale: CGFloat
    var radius: CGFloat
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

func getOrientation(_ orientation: UIDeviceOrientation) -> String {
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

func getDevice(_ idiom: UIUserInterfaceIdiom) -> String {
    switch idiom {
    case .phone:
        return "iPhone"
    case .pad:
        return "iPad"
    default:
        return "unspecified"
    }
}

func getFrameFromInsets(_ insets: UIEdgeInsets) -> Frame {
    return Frame(top: insets.top, right: insets.right, bottom: insets.bottom, left: insets.left)
}

func getFrameFromGuide(_ guide: UILayoutGuide, _ screen: Screen) -> Frame {
    return Frame(top: guide.layoutFrame.minY, right: screen.width - guide.layoutFrame.maxX, bottom: screen.height - guide.layoutFrame.maxY, left: guide.layoutFrame.minX)
}

class ViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    override func viewDidLayoutSubviews() {
        super.viewLayoutMarginsDidChange()
        
        let device = getDevice(UIDevice.current.userInterfaceIdiom)
        let orientation = getOrientation(UIDevice.current.orientation)
        let scale = UIScreen.main.scale
        let radius = UIScreen.main.displayCornerRadius
        let screen = Screen(width: UIScreen.main.bounds.width, height: UIScreen.main.bounds.height)
        let sizeClass = SizeClasses(horizontal: getSizeClass(self.traitCollection.horizontalSizeClass), vertical: getSizeClass(self.traitCollection.verticalSizeClass))
        let safeArea = getFrameFromInsets(self.view.safeAreaInsets)
        let layoutMargins = getFrameFromInsets(self.view.layoutMargins)
        let readableContent = getFrameFromGuide(self.view.readableContentGuide, screen)
        
        let dimensions = try! JSONEncoder().encode(Dimensions(device: device, orientation: orientation, scale: scale, radius: radius, screen: screen, sizeClass: sizeClass, safeArea: safeArea, layoutMargins: layoutMargins, readableContent: readableContent))
        
        self.view.accessibilityIdentifier = "dimensions"
        self.view.accessibilityLabel = String(data: dimensions, encoding: String.Encoding.utf8)
    }
}

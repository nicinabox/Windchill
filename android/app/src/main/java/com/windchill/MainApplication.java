package com.windchill;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.oblador.vectoricons.VectorIconsPackage;
import io.fixd.rctlocale.RCTLocalePackage;
import com.sbugert.rnadmob.RNAdMobPackage;
import com.bugsnag.BugsnagReactNative;
import com.oblador.vectoricons.VectorIconsPackage;
import io.fixd.rctlocale.RCTLocalePackage;
import com.sbugert.rnadmob.RNAdMobPackage;
import com.bugsnag.BugsnagReactNative;
import com.oblador.vectoricons.VectorIconsPackage;
import io.fixd.rctlocale.RCTLocalePackage;
import com.sbugert.rnadmob.RNAdMobPackage;
import com.bugsnag.BugsnagReactNative;
import com.facebook.soloader.SoLoader;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
  @Override
  public void onCreate() {
    super.onCreate();
    BugsnagReactNative.start(this);
    SoLoader.init(this, /* native exopackage */ false);
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new VectorIconsPackage(),
            new RCTLocalePackage(),
            new RNAdMobPackage(),
            BugsnagReactNative.getPackage(),
            new VectorIconsPackage(),
            new RCTLocalePackage(),
            new RNAdMobPackage(),
            BugsnagReactNative.getPackage(),
            new VectorIconsPackage(),
            new RCTLocalePackage(),
            new RNAdMobPackage(),
            BugsnagReactNative.getPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}

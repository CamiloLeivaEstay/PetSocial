import { Controller } from './logic/controller'
import { setStatusBarIcons } from './lib/native'
import type { Vals } from './lib/view'
import { SplashScreen } from './screens/SplashScreen'
import { OnboardingScreen } from './screens/OnboardingScreen'
import { AuthScreen } from './screens/AuthScreen'
import { PetSetupScreen } from './screens/PetSetupScreen'
import { HomeScreen } from './screens/HomeScreen'
import { ExploreScreen } from './screens/ExploreScreen'
import { LocationPermission } from './screens/LocationPermission'
import { SearchScreen } from './screens/SearchScreen'
import { SearchResultsScreen } from './screens/SearchResultsScreen'
import { ProviderDetailScreen } from './screens/ProviderDetailScreen'
import { BookingScreen } from './screens/BookingScreen'
import { ReservationsScreen } from './screens/ReservationsScreen'
import { LiveServiceScreen } from './screens/LiveServiceScreen'
import { MessagesScreen } from './screens/MessagesScreen'
import { PetDetailScreen } from './screens/PetDetailScreen'
import { PetFormScreen } from './screens/PetFormScreen'
import { PaymentsScreen } from './screens/PaymentsScreen'
import { HelpScreen } from './screens/HelpScreen'
import { ReviewScreen } from './screens/ReviewScreen'
import { ReviewDoneScreen } from './screens/ReviewDoneScreen'
import { CertRequestScreen } from './screens/CertRequestScreen'
import { CertViewScreen } from './screens/CertViewScreen'
import { FavoritesScreen } from './screens/FavoritesScreen'
import { ProfileScreen } from './screens/ProfileScreen'
import { ChatScreen } from './screens/ChatScreen'
import { SOSScreen } from './screens/SOSScreen'
import { DetailBar } from './components/DetailBar'
import { CertBar } from './components/CertBar'
import { ReviewBar } from './components/ReviewBar'
import { LiveComposerBar } from './components/LiveComposerBar'
import { PetFormBar } from './components/PetFormBar'
import { Toast } from './components/Toast'
import { BookingBar } from './components/BookingBar'
import { TabBar } from './components/TabBar'
import { SOSSheet } from './components/SOSSheet'
import { PlaceSheet } from './components/PlaceSheet'
import { PetSheet } from './components/PetSheet'
import { CertQrOverlay } from './components/CertQrOverlay'
import { LocationMapOverlay } from './components/LocationMapOverlay'
import { ExtrasSheet } from './components/ExtrasSheet'
import { CardSheet } from './components/CardSheet'

/** Screen layout: one scrolling content area plus the fixed bars and sheets layered on top. */
function AppShell({ v }: { v: Vals }) {
  return (
    <div className="app-frame">
      <div className="status-backdrop" style={{ background: v.statusBg }} />
      <div ref={v.scrollRef} className="app-scroll" style={{ paddingTop: v.contentTop }}>
        {v.isSplash ? <SplashScreen v={v} /> : null}
        {v.isOnboarding ? <OnboardingScreen v={v} /> : null}
        {v.isAuth ? <AuthScreen v={v} /> : null}
        {v.isSetup ? <PetSetupScreen v={v} /> : null}
        {v.isHome ? <HomeScreen v={v} /> : null}
        {v.isExplore ? <ExploreScreen v={v} /> : null}
        <LocationPermission v={v} />
        {v.isSearch ? <SearchScreen v={v} /> : null}
        {v.isResults ? <SearchResultsScreen v={v} /> : null}
        {v.isDetail ? <ProviderDetailScreen v={v} /> : null}
        {v.isBooking ? <BookingScreen v={v} /> : null}
        {v.isReservations ? <ReservationsScreen v={v} /> : null}
        {v.isLive ? <LiveServiceScreen v={v} /> : null}
        {v.isMessages ? <MessagesScreen v={v} /> : null}
        {v.isPetDetail ? <PetDetailScreen v={v} /> : null}
        {v.isPetForm ? <PetFormScreen v={v} /> : null}
        {v.isPayments ? <PaymentsScreen v={v} /> : null}
        {v.isHelp ? <HelpScreen v={v} /> : null}
        {v.isReview ? <ReviewScreen v={v} /> : null}
        {v.isReviewDone ? <ReviewDoneScreen v={v} /> : null}
        {v.isCert ? <CertRequestScreen v={v} /> : null}
        {v.isCertView ? <CertViewScreen v={v} /> : null}
        {v.isFavorites ? <FavoritesScreen v={v} /> : null}
        {v.isProfile ? <ProfileScreen v={v} /> : null}
        {v.isChat ? <ChatScreen v={v} /> : null}
        {v.isSOS ? <SOSScreen v={v} /> : null}
      </div>
      {v.isDetail ? <DetailBar v={v} /> : null}
      {v.isCert ? <CertBar v={v} /> : null}
      {v.isReview ? <ReviewBar v={v} /> : null}
      {v.liveComposer ? <LiveComposerBar v={v} /> : null}
      {v.isPetForm ? <PetFormBar v={v} /> : null}
      {v.toast ? <Toast v={v} /> : null}
      {v.isStep12 ? <BookingBar v={v} /> : null}
      {v.showTabs ? <TabBar v={v} /> : null}
      {v.sosOpen ? <SOSSheet v={v} /> : null}
      {v.placeSheet ? <PlaceSheet v={v} /> : null}
      {v.petSheet ? <PetSheet v={v} /> : null}
      {v.certQrOpen ? <CertQrOverlay v={v} /> : null}
      {v.locMapOpen ? <LocationMapOverlay v={v} /> : null}
      {v.extrasSheet ? <ExtrasSheet v={v} /> : null}
      {v.cardSheet ? <CardSheet v={v} /> : null}
    </div>
  )
}

export class App extends Controller {
  private _statusColor?: string
  private _vals: Vals = {}

  syncStatusBar() {
    const { statusColor } = this._vals
    if (statusColor !== this._statusColor) {
      this._statusColor = statusColor
      setStatusBarIcons(statusColor)
    }
  }

  componentDidMount() {
    super.componentDidMount()
    if (import.meta.env.DEV) (window as unknown as { __app: App }).__app = this
    this.syncStatusBar()
  }

  componentDidUpdate(prevProps: Vals) {
    super.componentDidUpdate(prevProps)
    this.syncStatusBar()
  }

  render() {
    this._vals = this.renderVals()
    return <AppShell v={this._vals} />
  }
}

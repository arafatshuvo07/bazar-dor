export default function ProfileLoading() {
  return (
    <div className="profile-page" role="status" aria-label="প্রোফাইল লোড হচ্ছে…">
      <div className="profile-heading card-skeleton" aria-hidden="true"><div className="skeleton-copy" /></div>
      <div className="profile-identity card-skeleton" aria-hidden="true">
        <span className="profile-avatar" /><div className="profile-identity-text"><div className="skeleton-copy" /></div>
      </div>
      <div className="profile-information card-skeleton" aria-hidden="true">
        <div className="profile-fields"><span className="auth-field-skeleton" /><span className="auth-field-skeleton" /></div>
      </div>
    </div>
  );
}

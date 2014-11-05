(function($) {
	$(function() {
		$("#regBtn").bind("click", function(event) {
			var password = $("#password").val();
			var confirmPassword = $("#confirmPassword").val();
			if (password !== confirmPassword) {
				alert("密码不等");
			}
		});
	});
})(jQuery);